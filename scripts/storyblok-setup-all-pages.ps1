$spaceId = "293515459950799"

$envFile = Join-Path $PSScriptRoot "..\.env.local"
$envLines = Get-Content $envFile
$managementToken = ($envLines | Where-Object { $_ -match '^STORYBLOK_MANAGEMENT_TOKEN=' } | ForEach-Object { $_.Split('=', 2)[1] })

if (-not $managementToken) {
    throw "STORYBLOK_MANAGEMENT_TOKEN is missing in .env.local"
}

$headers = @{
    Authorization = $managementToken
    "Content-Type" = "application/json"
}

function Invoke-StoryblokJson {
    param(
        [string]$Method,
        [string]$Uri,
        [object]$Body
    )

    if ($null -eq $Body) {
        return Invoke-RestMethod -Method $Method -Uri $Uri -Headers $headers
    }

    $json = $Body | ConvertTo-Json -Depth 100 -Compress
    return Invoke-RestMethod -Method $Method -Uri $Uri -Headers $headers -Body $json
}

function Upsert-Component {
    param([hashtable]$Definition)

    $existing = $script:existingComponents | Where-Object { $_.name -eq $Definition.name } | Select-Object -First 1
    $payload = @{ component = $Definition }

    if ($existing) {
        Write-Host "Updating component: $($Definition.name)"
        $result = Invoke-StoryblokJson -Method "PUT" -Uri "https://mapi.storyblok.com/v1/spaces/$spaceId/components/$($existing.id)" -Body $payload
        return $result.component
    }

    Write-Host "Creating component: $($Definition.name)"
    $result = Invoke-StoryblokJson -Method "POST" -Uri "https://mapi.storyblok.com/v1/spaces/$spaceId/components" -Body $payload
    return $result.component
}

function Upsert-Story {
    param(
        [string]$Slug,
        [hashtable]$StoryPayload
    )

    $encodedSlug = [System.Uri]::EscapeDataString($Slug)
    $existingStories = Invoke-StoryblokJson -Method "GET" -Uri "https://mapi.storyblok.com/v1/spaces/$spaceId/stories?with_slug=$encodedSlug" -Body $null
    $existing = $existingStories.stories | Select-Object -First 1

    if ($existing) {
        Write-Host "Updating story: $Slug"
        return Invoke-StoryblokJson -Method "PUT" -Uri "https://mapi.storyblok.com/v1/spaces/$spaceId/stories/$($existing.id)" -Body @{ story = $StoryPayload }
    }

    Write-Host "Creating story: $Slug"
    return Invoke-StoryblokJson -Method "POST" -Uri "https://mapi.storyblok.com/v1/spaces/$spaceId/stories" -Body @{ story = $StoryPayload }
}

function New-AssetValue {
    param([string]$Filename)
    return @{ filename = $Filename }
}

function New-TextItem {
    param([string]$Text)
    return @{ component = "text_item"; title = $Text }
}

function New-PointItem {
    param([string]$Title, [string]$Description = "")
    return @{ component = "point_item"; title = $Title; description = $Description }
}

function New-FeatureCard {
    param([string]$Icon, [string]$Title, [string]$Desc)
    return @{ component = "feature_card_item"; icon = New-AssetValue $Icon; title = $Title; desc = $Desc }
}

function New-IndustryItem {
    param([string]$Name, [string]$Image)
    return @{ component = "industry_item"; name = $Name; image = New-AssetValue $Image }
}

function New-StepItem {
    param([string]$Id, [string]$Title, [string]$Desc, [string]$Image)
    return @{ component = "step_item"; id = $Id; title = $Title; desc = $Desc; image = New-AssetValue $Image }
}

function New-ImageItem {
    param([string]$Image)
    return @{ component = "image_item"; image = New-AssetValue $Image }
}

function New-SimplePoint {
    param([string]$Title)
    return @{ component = "simple_point_item"; title = $Title }
}

$componentsResponse = Invoke-StoryblokJson -Method "GET" -Uri "https://mapi.storyblok.com/v1/spaces/$spaceId/components" -Body $null
$script:existingComponents = @($componentsResponse.components)

$componentDefinitions = @(
    @{
        name = "text_item"; display_name = "Text Item"; is_nestable = $true; is_root = $false
        schema = @{ title = @{ type = "textarea" } }
    },
    @{
        name = "simple_point_item"; display_name = "Simple Point Item"; is_nestable = $true; is_root = $false
        schema = @{ title = @{ type = "text" } }
    },
    @{
        name = "point_item"; display_name = "Point Item"; is_nestable = $true; is_root = $false
        schema = @{ title = @{ type = "text" }; description = @{ type = "textarea" } }
    },
    @{
        name = "detail_item"; display_name = "Detail Item"; is_nestable = $true; is_root = $false
        schema = @{ title = @{ type = "text" }; description = @{ type = "textarea" } }
    },
    @{
        name = "image_item"; display_name = "Image Item"; is_nestable = $true; is_root = $false
        schema = @{ image = @{ type = "asset" } }
    },
    @{
        name = "feature_card_item"; display_name = "Feature Card Item"; is_nestable = $true; is_root = $false
        schema = @{ icon = @{ type = "asset" }; title = @{ type = "text" }; desc = @{ type = "textarea" } }
    },
    @{
        name = "feature_cards_section"; display_name = "Feature Cards Section"; is_nestable = $true; is_root = $false
        schema = @{ heading = @{ type = "text" }; para = @{ type = "textarea" }; features = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("feature_card_item") } }
    },
    @{
        name = "page_hero"; display_name = "Page Hero"; is_nestable = $true; is_root = $false
        schema = @{ title = @{ type = "textarea" }; backgroundImage = @{ type = "asset" } }
    },
    @{
        name = "about_value_section"; display_name = "About Value Section"; is_nestable = $true; is_root = $false
        schema = @{ title = @{ type = "text" }; image = @{ type = "asset" }; description1 = @{ type = "textarea" }; description2 = @{ type = "textarea" }; description3 = @{ type = "textarea" }; description4 = @{ type = "textarea" } }
    },
    @{
        name = "about_why_choose_section"; display_name = "About Why Choose Section"; is_nestable = $true; is_root = $false
        schema = @{ heading = @{ type = "text" }; paragraphs = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("text_item") }; missionTitle = @{ type = "text" }; missionDescription = @{ type = "textarea" }; visionTitle = @{ type = "text" }; visionDescription = @{ type = "textarea" }; stats = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("stats_item") } }
    },
    @{
        name = "testimonials_section_config"; display_name = "Testimonials Section Config"; is_nestable = $true; is_root = $false
        schema = @{ heading = @{ type = "text" }; description = @{ type = "textarea" } }
    },
    @{
        name = "info_card_item"; display_name = "Info Card Item"; is_nestable = $true; is_root = $false
        schema = @{ title = @{ type = "text" }; value = @{ type = "textarea" }; href = @{ type = "text" }; type = @{ type = "text" } }
    },
    @{
        name = "contact_form_section"; display_name = "Contact Form Section"; is_nestable = $true; is_root = $false
        schema = @{ heading = @{ type = "textarea" }; infoCards = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("info_card_item") } }
    },
    @{
        name = "reliable_intro_section"; display_name = "Reliable Intro Section"; is_nestable = $true; is_root = $false
        schema = @{ title = @{ type = "text" }; description = @{ type = "textarea" }; image = @{ type = "asset" }; buttonText = @{ type = "text" }; buttonHref = @{ type = "text" } }
    },
    @{
        name = "second_heli_section"; display_name = "Second Heli Section"; is_nestable = $true; is_root = $false
        schema = @{ heading = @{ type = "textarea" }; desc = @{ type = "textarea" }; heading2 = @{ type = "text" }; desc2 = @{ type = "textarea" }; image = @{ type = "asset" }; titles = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("text_item") }; para = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("text_item") } }
    },
    @{
        name = "split_section_item"; display_name = "Split Section Item"; is_nestable = $true; is_root = $false
        schema = @{ title = @{ type = "text" }; image = @{ type = "asset" }; imageAlt = @{ type = "text" }; reverse = @{ type = "boolean" }; paragraphs = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("text_item") }; points = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("point_item", "simple_point_item") } }
    },
    @{
        name = "step_item"; display_name = "Step Item"; is_nestable = $true; is_root = $false
        schema = @{ id = @{ type = "text" }; title = @{ type = "text" }; desc = @{ type = "textarea" }; image = @{ type = "asset" } }
    },
    @{
        name = "steps_section"; display_name = "Steps Section"; is_nestable = $true; is_root = $false
        schema = @{ title = @{ type = "text" }; description = @{ type = "textarea" }; steps = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("step_item") } }
    },
    @{
        name = "industry_item"; display_name = "Industry Item"; is_nestable = $true; is_root = $false
        schema = @{ name = @{ type = "text" }; image = @{ type = "asset" } }
    },
    @{
        name = "industries_section"; display_name = "Industries Section"; is_nestable = $true; is_root = $false
        schema = @{ heading = @{ type = "text" }; industries = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("industry_item") } }
    },
    @{
        name = "faq_section"; display_name = "FAQ Section"; is_nestable = $true; is_root = $false
        schema = @{ heading = @{ type = "text" }; description = @{ type = "textarea" }; assistanceHeading = @{ type = "text" }; assistanceDescription = @{ type = "textarea" }; contactPhone = @{ type = "text" }; contactEmail = @{ type = "text" }; image = @{ type = "asset" } }
    },
    @{
        name = "cta_section_content"; display_name = "CTA Section Content"; is_nestable = $true; is_root = $false
        schema = @{ heading = @{ type = "text" }; description = @{ type = "textarea" }; buttonText = @{ type = "text" }; buttonHref = @{ type = "text" } }
    },
    @{
        name = "it_value_card_section"; display_name = "IT Value Card Section"; is_nestable = $true; is_root = $false
        schema = @{ btn = @{ type = "text" }; title = @{ type = "text" }; subtitle = @{ type = "text" }; description1 = @{ type = "textarea" }; description2 = @{ type = "textarea" }; image1 = @{ type = "asset" }; image2 = @{ type = "asset" } }
    },
    @{
        name = "hv_grey_section_item"; display_name = "HV Grey Section Item"; is_nestable = $true; is_root = $false
        schema = @{ title = @{ type = "text" }; subtitle = @{ type = "text" }; image = @{ type = "asset" }; imageAlt = @{ type = "text" }; points = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("point_item") }; paragraphs = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("text_item") } }
    },
    @{
        name = "hv_left_right_section_item"; display_name = "HV Left Right Section Item"; is_nestable = $true; is_root = $false
        schema = @{ title = @{ type = "text" }; subtitle = @{ type = "text" }; paragraphs = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("text_item") }; image = @{ type = "asset" }; imageAlt = @{ type = "text" }; reverse = @{ type = "boolean" }; keytitle = @{ type = "text" }; points = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("simple_point_item") }; greytitle = @{ type = "text" }; greypara = @{ type = "textarea" } }
    },
    @{
        name = "urban_section"; display_name = "Urban Section"; is_nestable = $true; is_root = $false
        schema = @{ btn = @{ type = "text" }; title = @{ type = "text" }; subtitle = @{ type = "text" }; description1 = @{ type = "textarea" }; description2 = @{ type = "textarea" }; solutions = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("text_item") }; image1 = @{ type = "asset" }; image2 = @{ type = "asset" } }
    },
    @{
        name = "black_split_section_item"; display_name = "Black Split Section Item"; is_nestable = $true; is_root = $false
        schema = @{ id = @{ type = "text" }; title = @{ type = "text" }; model = @{ type = "text" }; description = @{ type = "textarea" }; features = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("text_item") }; image = @{ type = "asset" }; imageAlt = @{ type = "text" } }
    },
    @{
        name = "single_split_section_item"; display_name = "Single Split Section Item"; is_nestable = $true; is_root = $false
        schema = @{ id = @{ type = "text" }; title = @{ type = "text" }; model = @{ type = "text" }; description = @{ type = "textarea" }; features = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("text_item") }; image = @{ type = "asset" }; imageAlt = @{ type = "text" } }
    },
    @{
        name = "warning_card_item"; display_name = "Warning Card Item"; is_nestable = $true; is_root = $false
        schema = @{ id = @{ type = "text" }; title = @{ type = "text" }; icon = @{ type = "text" } }
    },
    @{
        name = "aircraft_warning_section"; display_name = "Aircraft Warning Section"; is_nestable = $true; is_root = $false
        schema = @{ title = @{ type = "text" }; paragraphs = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("text_item") }; cards = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("warning_card_item") }; image = @{ type = "asset" }; imageAlt = @{ type = "text" } }
    },
    @{
        name = "aircraft_detail_section"; display_name = "Aircraft Detail Section"; is_nestable = $true; is_root = $false
        schema = @{ id = @{ type = "text" }; title = @{ type = "text" }; model = @{ type = "text" }; description = @{ type = "textarea" }; image = @{ type = "asset" }; imageAlt = @{ type = "text" }; reverse = @{ type = "boolean" }; details = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("detail_item") } }
    },
    @{
        name = "image_content_section_block"; display_name = "Image Content Section Block"; is_nestable = $true; is_root = $false
        schema = @{ image = @{ type = "asset" }; imageAlt = @{ type = "text" }; title = @{ type = "text" }; paragraphs = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("text_item") }; subTitle = @{ type = "text" }; points = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("simple_point_item") } }
    },
    @{
        name = "list_block_section"; display_name = "List Block Section"; is_nestable = $true; is_root = $false
        schema = @{ title = @{ type = "text" }; description = @{ type = "textarea" }; halfWidthDescription = @{ type = "boolean" }; type = @{ type = "text" }; items = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("simple_point_item") } }
    },
    @{
        name = "activity_content_section"; display_name = "Activity Content Section"; is_nestable = $true; is_root = $false
        schema = @{ topImages = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("image_item") }; title = @{ type = "text" }; paragraphs = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("text_item") }; listBlocks = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("list_block_section") }; bottomImage = @{ type = "asset" } }
    },
    @{
        name = "about_page"; display_name = "About Page"; is_nestable = $false; is_root = $true
        schema = @{
            hero = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("page_hero") }
            intro = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("about_value_section") }
            story = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("about_value_section") }
            whatWeDo = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("feature_cards_section") }
            whyChooseUs = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("about_why_choose_section") }
            values = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("feature_cards_section") }
            testimonials = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("testimonials_section_config") }
            cta = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("cta_section_content") }
        }
    },
    @{
        name = "contact_page"; display_name = "Contact Page"; is_nestable = $false; is_root = $true
        schema = @{
            hero = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("page_hero") }
            form = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("contact_form_section") }
        }
    },
    @{
        name = "portable_lighting_page"; display_name = "Portable Lighting Page"; is_nestable = $false; is_root = $true
        schema = @{
            hero = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("page_hero") }
            intro = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("reliable_intro_section") }
            features = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("feature_cards_section") }
            sections = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("split_section_item") }
            steps = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("steps_section") }
            industries = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("industries_section") }
            faq = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("faq_section") }
            cta = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("cta_section_content") }
        }
    },
    @{
        name = "standard_solution_page"; display_name = "Standard Solution Page"; is_nestable = $false; is_root = $true
        schema = @{
            hero = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("page_hero") }
            intro = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("second_heli_section") }
            features = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("feature_cards_section") }
            sections = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("split_section_item") }
            industries = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("industries_section") }
            faq = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("faq_section") }
            cta = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("cta_section_content") }
        }
    },
    @{
        name = "lighting_solution_page"; display_name = "Lighting Solution Page"; is_nestable = $false; is_root = $true
        schema = @{
            hero = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("page_hero") }
            intro = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("it_value_card_section") }
            ecosystem = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("hv_grey_section_item") }
            features = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("feature_cards_section") }
            flushLights = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("hv_left_right_section_item") }
            hoodedLights = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("hv_left_right_section_item") }
            windcone = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("hv_left_right_section_item") }
            future = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("urban_section") }
            faq = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("faq_section") }
        }
    },
    @{
        name = "obstruction_solution_page"; display_name = "Obstruction Solution Page"; is_nestable = $false; is_root = $true
        schema = @{
            hero = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("page_hero") }
            intro = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("reliable_intro_section") }
            features = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("feature_cards_section") }
            lowerSections = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("black_split_section_item") }
            upperSections = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("black_split_section_item") }
            ledSection = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("single_split_section_item") }
            steps = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("steps_section") }
            industries = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("industries_section") }
            faq = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("faq_section") }
            cta = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("cta_section_content") }
        }
    },
    @{
        name = "aircraft_page"; display_name = "Aircraft Page"; is_nestable = $false; is_root = $true
        schema = @{
            hero = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("page_hero") }
            warningLights = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("aircraft_warning_section") }
            primarySections = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("aircraft_detail_section") }
            secondarySections = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("aircraft_detail_section") }
        }
    },
    @{
        name = "activity_content_page"; display_name = "Activity Content Page"; is_nestable = $false; is_root = $true
        schema = @{
            hero = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("page_hero") }
            intro = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("activity_content_section") }
            features = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("feature_cards_section") }
            sections = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("split_section_item") }
            cta = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("cta_section_content") }
        }
    },
    @{
        name = "image_intro_page"; display_name = "Image Intro Page"; is_nestable = $false; is_root = $true
        schema = @{
            hero = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("page_hero") }
            intro = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("image_content_section_block") }
            features = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("feature_cards_section") }
            sections = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("split_section_item") }
            cta = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("cta_section_content") }
        }
    }
)

foreach ($definition in $componentDefinitions) {
    Upsert-Component -Definition $definition | Out-Null
}

$stories = @(
    @{
        slug = "about"; name = "About"; content = @{
            component = "about_page"
            hero = @(@{ component = "page_hero"; title = "About Us"; backgroundImage = New-AssetValue "/about/hero.png" })
            intro = @(@{ component = "about_value_section"; title = "About Cranton Electrical Limited"; image = New-AssetValue "/about/1.png"; description1 = "Cranton Electrical Limited is a global manufacturer specializing in aluminium helidecks, heliport lighting systems, and obstruction lighting solutions for both offshore and land-based aviation environments."; description2 = "With extensive expertise in manufacturing and heliport/vertiport systems integration, Cranton supports government organizations, private operators, offshore facilities, hospitals, industrial sites, and aviation developers worldwide."; description3 = "Working closely with industry experts, engineering partners, and trusted vendors, Cranton combines technical precision with innovative aluminium fabrication capabilities."; description4 = "Our lightweight aluminium structures are specifically engineered for applications where weight reduction, corrosion resistance, durability, and low maintenance are essential." })
            story = @(@{ component = "about_value_section"; title = "Our Story"; image = New-AssetValue "/about/2.png"; description1 = "Cranton Electrical Limited was founded with a clear objective to deliver reliable, high-performance helideck and heliport solutions for demanding aviation environments."; description2 = "We specialize in the design, manufacturing, and installation of aluminium helidecks, deck platforms, heliport lighting systems, and obstruction lighting solutions."; description3 = "Our team works closely with clients, consultants, vendors, and project partners throughout every stage."; description4 = "Cranton continues to deliver innovative heliport infrastructure solutions for clients locally and internationally." })
            whatWeDo = @(@{ component = "feature_cards_section"; heading = "What We Do"; para = "Engineered helidecks, platforms, and lighting solutions built for safe, reliable offshore and land-based aviation operations."; features = @(
                (New-FeatureCard "/about/c1.png" "Expert Engineering Solutions" "From concept to commissioning, our teams manage every stage with precision and strict compliance."),
                (New-FeatureCard "/about/c2.png" "Uncompromised Quality" "We follow strict quality standards to ensure all systems are safe, reliable, and durable, every time."),
                (New-FeatureCard "/about/c3.png" "Reliable Long-Term Support" "We provide ongoing support and maintenance to ensure systems perform efficiently throughout their lifecycle."),
                (New-FeatureCard "/about/c4.png" "Continuous Innovation" "We continuously refine processes, adopt new technologies, and strengthen capabilities to meet industry demands.")
            ) })
            whyChooseUs = @(@{ component = "about_why_choose_section"; heading = "Why Choose Us"; paragraphs = @((New-TextItem "We deliver lightweight, high-strength helideck and heliport/vertiport solutions engineered for durability, safety, and long-term performance."),(New-TextItem "Our experienced team combines engineering expertise, precision manufacturing, and international aviation standards."),(New-TextItem "Cranton is committed to delivering innovative, compliant, and cost-effective solutions.")); missionTitle = "Our Mission"; missionDescription = "To provide the highest technical competence through strong collaboration and the shortest possible delivery time in the manufacturing and commissioning of helidecks."; visionTitle = "Vision"; visionDescription = "To collaborate with research institutes and high-tech partners in developing advanced, innovative, and future-ready heliport solutions."; stats = @(
                @{ component = "stats_item"; value = "450"; suffix = ""; label = "Completed Projects" },
                @{ component = "stats_item"; value = "32"; suffix = "+"; label = "Countries Served" },
                @{ component = "stats_item"; value = "8"; suffix = "+"; label = "Years Of Experience" }
            ) })
            values = @(@{ component = "feature_cards_section"; heading = "The Values That Define Our Success"; para = ""; features = @(
                (New-FeatureCard "/about/c5.png" "Safety First" "Every solution we manufacture is designed with aviation safety, operational reliability, and regulatory compliance at its core."),
                (New-FeatureCard "/about/c6.png" "Engineering Excellence" "We combine technical expertise, precision manufacturing, and innovative design to deliver high-performance helideck and heliport solutions."),
                (New-FeatureCard "/about/c7.png" "Quality & Durability" "Our aluminium structures and lighting systems are built for long-term strength, corrosion resistance, and low-maintenance performance."),
                (New-FeatureCard "/about/c8.png" "Client Commitment" "We work closely with every client to deliver tailored solutions and dependable support.")
            ) })
            testimonials = @(@{ component = "testimonials_section_config"; heading = "What Our Clients Say"; description = "We are proud to have earned the trust of our clients worldwide." })
            cta = @(@{ component = "cta_section_content"; heading = "Let's Build Your Helideck Project"; description = "Get in touch with our team to discuss your helideck requirements and receive a tailored solution designed for performance, safety, and long-term reliability."; buttonText = "Request a quote"; buttonHref = "/contact" })
        }
    },
    @{
        slug = "contact"; name = "Contact"; content = @{
            component = "contact_page"
            hero = @(@{ component = "page_hero"; title = "Contact Us"; backgroundImage = New-AssetValue "/contact/hero.png" })
            form = @(@{ component = "contact_form_section"; heading = "Have Inquiries?`nReach Out Via`nMessage"; infoCards = @(
                @{ component = "info_card_item"; title = "Our Address"; value = "Office 11A, Design Works, William`nStreet, Felling, NE10 0JP, United`nKingdom."; href = "https://www.google.com/maps/search/?api=1&query=Office+11A+Design+Works+William+Street+Felling+NE10+0JP+United+Kingdom"; type = "address" },
                @{ component = "info_card_item"; title = "Contact Info"; value = "+44 191 640 76 03"; href = "tel:+441916407603"; type = "phone" },
                @{ component = "info_card_item"; title = "E-mail Us"; value = "info@crantonelectric.com"; href = "mailto:info@crantonelectric.com"; type = "email" }
            ) })
        }
    },
    @{
        slug = "portable-lighting-solutions"; name = "Portable Lighting Solutions"; content = @{
            component = "portable_lighting_page"
            hero = @(@{ component = "page_hero"; title = "Portable Lighting Solutions"; backgroundImage = New-AssetValue "/portable-lighting/hero.png" })
            intro = @(@{ component = "reliable_intro_section"; title = "Portable Lighting Solutions for Safe & Reliable Operations"; description = "Engineered for high visibility and rapid deployment, our portable lighting systems ensure safe aviation operations in remote, temporary, and emergency environments without the need for fixed infrastructure"; image = New-AssetValue "/portable-lighting/specification.png"; buttonText = "Request a Quote"; buttonHref = "/contact" })
            features = @(@{ component = "feature_cards_section"; heading = "Engineered for Performance & Reliability"; para = ""; features = @(
                (New-FeatureCard "/portable-lighting/1.png" "Self-Powered Operation" "Integrated rechargeable battery system enables independent operation without external power sources."),
                (New-FeatureCard "/portable-lighting/2.png" "Advanced LED" "Ultra-bright LED lighting ensures maximum visibility while reducing power consumption and maintenance."),
                (New-FeatureCard "/portable-lighting/3.png" "Rugged Construction" "Built with durable materials and sealed construction (IP-rated) to withstand harsh environmental conditions."),
                (New-FeatureCard "/portable-lighting/4.png" "Portable & Easy to Deploy" "Lightweight design with integrated handles allows quick installation, relocation, and setup.")
            ) })
            sections = @(
                @{ component = "split_section_item"; title = "Reliable Lighting Where You Need It Most"; image = New-AssetValue "/portable-lighting/specs.png"; imageAlt = "Portable Lighting Specifications"; paragraphs = @((New-TextItem "Cranton portable lighting solutions are designed to provide dependable illumination for aviation operations where traditional power sources are unavailable or impractical."),(New-TextItem "Ideal for temporary helipads, emergency response, and remote operations, our systems ensure safe landing, take-off, and ground movement anytime, anywhere.")); points = @((New-SimplePoint "Enables safe night and low-visibility operations"),(New-SimplePoint "Eliminates dependency on fixed power infrastructure"),(New-SimplePoint "Supports rapid deployment in emergency situations"),(New-SimplePoint "Ensures operational continuity in remote locations")) }
            )
            steps = @(@{ component = "steps_section"; title = "Designed for Real-World Aviation Needs"; description = "Our portable lighting systems go beyond basic illumination by offering advanced control and operational features."; steps = @(
                (New-StepItem "01" "Wireless Remote Control" "Operate and manage lighting systems remotely, enabling efficient control from a safe distance." "/portable-lighting/step1.png"),
                (New-StepItem "02" "Air-to-Ground Communication Control" "Optional integration allows direct control between ground systems and aircraft for enhanced coordination." "/portable-lighting/step2.png"),
                (New-StepItem "03" "Multiple Color Configurations" "Supports various color options to meet different aviation lighting requirements and operational needs." "/portable-lighting/step3.png"),
                (New-StepItem "04" "Extended Operational Runtime" "Designed for long-lasting performance, ensuring continuous operation." "/portable-lighting/step4.png")
            ) })
            industries = @(@{ component = "industries_section"; heading = "Where It's Used"; industries = @(
                (New-IndustryItem "Temporary Helipads & Vertipads" "/portable-lighting/img1.png"),
                (New-IndustryItem "Remote & Off-Grid Locations" "/portable-lighting/img2.png"),
                (New-IndustryItem "Airfield & Taxiway Lighting" "/portable-lighting/img3.png"),
                (New-IndustryItem "Disaster Response & Rapid Deployment" "/portable-lighting/img4.png"),
                (New-IndustryItem "Emergency & Medical Evacuation Operations" "/portable-lighting/img5.png")
            ) })
            faq = @(@{ component = "faq_section"; heading = "Frequently Asked Questions"; description = ""; assistanceHeading = "Need Help ?"; assistanceDescription = "Need reliable solutions or urgent support? Get in touch with our expert team today."; contactPhone = "+44 191 640 75 03"; contactEmail = "info@crantonelectric.com"; image = New-AssetValue "/faqs/4.png" })
            cta = @(@{ component = "cta_section_content"; heading = "Need a Portable Helipad Solution?"; description = "Tell us about your project requirements and our experts will help you design the right solution for your operational needs."; buttonText = "Request a Quote"; buttonHref = "/contact" })
        }
    },
    @{
        slug = "portable-helipads-and-vertipads"; name = "Portable Helipads & Vertipads"; content = @{
            component = "standard_solution_page"
            hero = @(@{ component = "page_hero"; title = "Portable Helipads & Vertipads"; backgroundImage = New-AssetValue "/ph.png" })
            intro = @(@{ component = "second_heli_section"; heading = "Portable Helipads & Vertipads <br/> for Rapid Deployment"; desc = "Engineered for speed, safety, and reliability, our modular landing systems enable secure helicopter operations in temporary, remote, and high-demand environments."; heading2 = "Built for Critical Operations"; desc2 = "Portable helipad and vertipad solutions designed to deliver stable and compliant landing platforms where permanent infrastructure is not feasible."; image = New-AssetValue "/ps1.png"; titles = @((New-TextItem "Enables rapid aviation access anywhere"),(New-TextItem "Reduces infrastructure cost and time"),(New-TextItem "Ensures safe operations in temporary setups"),(New-TextItem "Supports mission-critical deployments")); para = @((New-TextItem "Deploy landing platforms quickly in remote or temporary locations."),(New-TextItem "Eliminates the need for complex civil works and accelerates timelines."),(New-TextItem "Provides stable, anti-slip, and load-tested surfaces."),(New-TextItem "Designed for high-pressure scenarios such as emergency response and defense operations.")) })
            features = @(@{ component = "feature_cards_section"; heading = "Engineered for Performance"; para = ""; features = @(
                (New-FeatureCard "/22.png" "Modular & Scalable Design" "Flexible interlocking systems that adapt to different site sizes and operational requirements."),
                (New-FeatureCard "/33.png" "High Load-Bearing Strength" "Built to support heavy helicopter operations with structural stability."),
                (New-FeatureCard "/44.png" "Slip-Resistant & Durable" "Durable surface ensures safe operations in all environmental conditions."),
                (New-FeatureCard "/55.png" "Rapid Installation" "Quick assembly and dismantling for time-critical deployments.")
            ) })
            sections = @(
                @{ component = "split_section_item"; title = "Designed for Demanding Environments"; image = New-AssetValue "/pb.png"; imageAlt = "Engineering Precision"; paragraphs = @((New-TextItem "Our systems are engineered to deliver consistent performance under demanding conditions, combining strength, durability, and operational efficiency.")); points = @((New-SimplePoint "High-strength modular materials"),(New-SimplePoint "Optimized load distribution"),(New-SimplePoint "Long operational lifespan"),(New-SimplePoint "Minimal maintenance requirements")) }
            )
            industries = @(@{ component = "industries_section"; heading = "Where It's Used"; industries = @(
                (New-IndustryItem "Emergency & Medical Operations" "/w1.png"),
                (New-IndustryItem "Remote & Off-Grid Locations" "/w2.png"),
                (New-IndustryItem "Construction & Infrastructure Projects" "/w3.png"),
                (New-IndustryItem "Temporary Aviation Facilities" "/w4.png"),
                (New-IndustryItem "Defense & Rapid Response" "/w5.png")
            ) })
            faq = @(@{ component = "faq_section"; heading = "Frequently Asked Questions"; description = ""; assistanceHeading = "Need Help ?"; assistanceDescription = "Our lighting specialists are ready to help you select the perfect obstruction lighting solution for your operational needs."; contactPhone = "+44 191 640 75 03"; contactEmail = "info@crantonelectric.com"; image = New-AssetValue "/faqs/2.png" })
            cta = @(@{ component = "cta_section_content"; heading = "Need a Portable Helipad Solution?"; description = "Tell us about your project requirements and our experts will help you design the right solution for your operational needs."; buttonText = "Request a quote"; buttonHref = "/contact" })
        }
    },
    @{
        slug = "modular-floating-solutions"; name = "Modular Floating Solutions"; content = @{
            component = "standard_solution_page"
            hero = @(@{ component = "page_hero"; title = "Modular Floating Solutions"; backgroundImage = New-AssetValue "/mhero.png" })
            intro = @(@{ component = "second_heli_section"; heading = "Modular Floating Solutions for Flexible Water-Based Operations"; desc = "Engineered for stability, adaptability, and durability, our modular floating systems enable reliable performance across marine, industrial, and temporary applications."; heading2 = "Built for Versatility on Water"; desc2 = "Modular floating solutions designed to create stable and scalable platforms for a wide range of water-based applications."; image = New-AssetValue "/ms.png"; titles = @((New-TextItem "Flexible Deployment on Water Surfaces"),(New-TextItem "Cost-Effective Alternative to Fixed Structures"),(New-TextItem "Stable and Safe Platform Design"),(New-TextItem "Supports Diverse Applications")); para = @((New-TextItem "Deploy modular floating platforms across various water bodies."),(New-TextItem "Reduce the need for heavy marine construction."),(New-TextItem "Provide a secure, anti-slip surface suitable for operational and recreational use."),(New-TextItem "Ideal for industrial, marine, leisure, and temporary setups.")) })
            features = @(@{ component = "feature_cards_section"; heading = "Engineered for Performance"; para = ""; features = @(
                (New-FeatureCard "/22.png" "Modular & Scalable Design" "Interlocking units allow flexible configurations tailored to different project sizes and requirements."),
                (New-FeatureCard "/333.png" "High Load Stability" "Designed for balanced load distribution, ensuring safe and stable performance on water."),
                (New-FeatureCard "/444.png" "Durable Weather Protection" "Built with high-quality materials to withstand harsh marine and environmental conditions."),
                (New-FeatureCard "/555.png" "Quick Installation" "Simple assembly process enables fast deployment with minimal equipment and manpower.")
            ) })
            sections = @(
                @{ component = "split_section_item"; title = "Designed for Demanding Water Environments"; image = New-AssetValue "/mb.png"; imageAlt = "Engineering Precision"; paragraphs = @((New-TextItem "Our systems are engineered to deliver consistent performance under demanding conditions, combining strength, durability, and operational efficiency.")); points = @((New-SimplePoint "High-strength modular materials"),(New-SimplePoint "Optimized load distribution"),(New-SimplePoint "Long operational lifespan"),(New-SimplePoint "Minimal maintenance requirements")) }
            )
            industries = @(@{ component = "industries_section"; heading = "Where It's Used"; industries = @(
                (New-IndustryItem "Marinas & Floating Docks" "/w6.png"),
                (New-IndustryItem "Industrial & Work Platforms" "/w7.png"),
                (New-IndustryItem "Temporary Floating Structures" "/w8.png"),
                (New-IndustryItem "Leisure & Recreational Facilities" "/w9.png"),
                (New-IndustryItem "Events & Specialized Installations" "/w10.png")
            ) })
            faq = @(@{ component = "faq_section"; heading = "Frequently Asked Questions"; description = ""; assistanceHeading = "Need Help ?"; assistanceDescription = "Our lighting specialists are ready to help you select the perfect obstruction lighting solution for your operational needs."; contactPhone = "+44 191 640 75 03"; contactEmail = "info@crantonelectric.com"; image = New-AssetValue "/faqs/3.png" })
            cta = @(@{ component = "cta_section_content"; heading = "Need a Portable Helipad Solution?"; description = "Tell us about your project requirements and our experts will help you design the right solution for your operational needs."; buttonText = "Request a quote"; buttonHref = "/contact" })
        }
    },
    @{
        slug = "heliports-and-vertiports-solutions"; name = "Heliports & Vertiports Solutions"; content = @{
            component = "standard_solution_page"
            hero = @(@{ component = "page_hero"; title = "Heliports & Vertiports Solutions"; backgroundImage = New-AssetValue "/hhero.png" })
            intro = @(@{ component = "second_heli_section"; heading = "Reliable Heliports & Vertiports for Offshore, Urban & Remote Operations"; desc = "Engineered for safety, durability, and operational efficiency, our heliport and vertiport solutions support secure helicopter landing operations across offshore, marine, industrial, and remote environments."; heading2 = "Built for Safe Aviation Operations"; desc2 = "Solutions designed to deliver stable, compliant, and high-performance landing areas for helicopters operating in demanding environments."; image = New-AssetValue "/newheliport.png"; titles = @((New-TextItem "Offshore & Remote Deployment"),(New-TextItem "Durable Structural Engineering"),(New-TextItem "Safe Landing Surface"),(New-TextItem "Custom Platform Solutions")); para = @((New-TextItem "Designed for offshore platforms, vessels, and remote industrial sites."),(New-TextItem "Manufactured using high-strength materials for harsh conditions."),(New-TextItem "Engineered with anti-slip surfaces and balanced structural stability."),(New-TextItem "Available in multiple sizes and configurations.")) })
            features = @(@{ component = "feature_cards_section"; heading = "Engineered for Performance"; para = ""; features = @(
                (New-FeatureCard "/h1.png" "High Load Capacity" "Built to support demanding helicopter operations with stable load distribution and structural integrity."),
                (New-FeatureCard "/h2.png" "Weatherproof & Durable" "Designed to perform in challenging marine and offshore environments with long-lasting durability."),
                (New-FeatureCard "/h3.png" "Compliance Ready" "Manufactured to align with aviation and heliport operational standards for safe and reliable performance."),
                (New-FeatureCard "/h4.png" "Fast Installation" "Efficient assembly and deployment process minimizes operational downtime and installation complexity.")
            ) })
            sections = @(
                @{ component = "split_section_item"; title = "Designed for Demanding Aviation Environments"; image = New-AssetValue "/hb.png"; imageAlt = "Engineering"; paragraphs = @((New-TextItem "Cranton helideck platforms are engineered to provide safe, durable, and reliable landing infrastructure for offshore and land-based aviation operations."),(New-TextItem "Every helideck platform is developed to meet international aviation standards and project-specific operational requirements.")); points = @((New-PointItem "Lightweight Aluminium Construction" "Strong, corrosion-resistant structures designed for demanding environments."),(New-PointItem "Fixed & Portable Platform Solutions" "Flexible helideck systems for permanent, temporary, and remote operations."),(New-PointItem "Engineered For Harsh Conditions" "Built to withstand offshore, marine, industrial, and remote environments."),(New-PointItem "Safe, Durable & Compliant" "Designed to meet international aviation safety and operational standards.")) }
            )
            industries = @(@{ component = "industries_section"; heading = "Where It's Used"; industries = @(
                (New-IndustryItem "Emergency & Medical Operations" "/w11new.png"),
                (New-IndustryItem "Marine & Vessel Operations" "/w12new.png"),
                (New-IndustryItem "Construction & Infrastructure Projects" "/w13.png"),
                (New-IndustryItem "Temporary Aviation Installations" "/w14new.png"),
                (New-IndustryItem "Emergency Response Sites" "/w15new.png"),
                (New-IndustryItem "Healthcare" "/w16new.png")
            ) })
            faq = @(@{ component = "faq_section"; heading = "Frequently Asked Questions"; description = ""; assistanceHeading = "Need Help ?"; assistanceDescription = "Our lighting specialists are ready to help you select the perfect obstruction lighting solution for your operational needs."; contactPhone = "+44 191 640 75 03"; contactEmail = "info@crantonelectric.com"; image = New-AssetValue "/faqs/1.png" })
            cta = @(@{ component = "cta_section_content"; heading = "Need a Reliable Heliport & Vertiport Solution?"; description = "Tell us about your project requirements and our experts will help you design the right solution for your operational needs."; buttonText = "Request a quote"; buttonHref = "/contact" })
        }
    },
    @{
        slug = "heliports-and-vertiports-lighting-solutions"; name = "Heliports & Vertiports Lighting Solutions"; content = @{
            component = "lighting_solution_page"
            hero = @(@{ component = "page_hero"; title = "Heliports & Vertiports Lighting Solutions"; backgroundImage = New-AssetValue "/heliport-vertiports/hero.png" })
            intro = @(@{ component = "it_value_card_section"; btn = "Inquire Now"; title = "Heliports & Vertiports Lighting Solutions"; subtitle = "Smart, Safe & Future-Ready Air Mobility Infrastructure"; description1 = "Crantron delivers advanced lighting systems engineered for modern heliports and next-generation vertiports. Designed to meet international aviation standards, our solutions ensure maximum visibility, operational safety, and energy efficiency across all landing environments day or night."; description2 = "From precision landing guidance to environmental awareness, our lighting portfolio supports safe aircraft operations in even the most demanding conditions."; image1 = New-AssetValue "/heliport-vertiports/newleft.png"; image2 = New-AssetValue "/heliport-vertiports/right1.jpg" })
            ecosystem = @(
                @{
                    component = "hv_grey_section_item"
                    title = "Complete Lighting Ecosystem"
                    subtitle = "End-to-End Airside Visibility."
                    image = New-AssetValue "/heliport-vertiports/ecosystem.png"
                    imageAlt = "Engineering Precision"
                    points = @(
                        (New-PointItem "LED Perimeter Lights (Surface Mounted)" "Elevated lighting systems designed to clearly define helideck and landing area boundaries for safe operations."),
                        (New-PointItem "LED Perimeter Lights (Flush Mounted)" "Low-profile inset lighting solutions that provide clear visual guidance while maintaining a smooth deck surface."),
                        (New-PointItem "LED Wind Direction Indicator" "Illuminated wind indication systems that provide pilots with clear wind direction visibility in all operating conditions."),
                        (New-PointItem "LED H and Circle Lights" "Aviation beacons designed to improve site identification and visibility from long operational distances."),
                        (New-PointItem "LED Low Intensity Obstruction Lights" "Reliable obstruction warning lights developed to improve visibility and enhance aviation safety around structures and elevated areas.")
                    )
                    paragraphs = @((New-TextItem ""))
                }
            )
            features = @(
                @{
                    component = "feature_cards_section"
                    heading = "Engineered for Reliability, Efficiency & Safety"
                    para = ""
                    features = @(
                        (New-FeatureCard "/heliport-vertiports/1.png" "High-Performance LED Technology" "Up to 100,000-hour lifespan with consistent brightness"),
                        (New-FeatureCard "/heliport-vertiports/2.png" "Energy Efficiency" "Low power consumption reduces operational costs"),
                        (New-FeatureCard "/heliport-vertiports/3.png" "Rugged Construction" "Corrosion-resistant materials designed for demanding environments"),
                        (New-FeatureCard "/heliport-vertiports/4.png" "Environmental Protection" "IP-rated systems for resistance against dust and water ingress"),
                        (New-FeatureCard "/heliport-vertiports/5.png" "Flexible Control Options" "Adjustable light intensity for different operational requirements"),
                        (New-FeatureCard "/heliport-vertiports/6.png" "Pilot-Centric Design" "Glare reduction and NVG compatibility for enhanced safety")
                    )
                }
            )
            flushLights = @(
                @{
                    component = "hv_left_right_section_item"
                    title = "FATO / TLOF Flush Mounted Helipad Lights"
                    subtitle = "Precision Guidance Without Obstruction"
                    paragraphs = @(
                        (New-TextItem "Crantron's flush mounted helipad lights are designed for seamless integration into landing surfaces, providing clear visual guidance without creating physical obstacles for aircraft or ground operations."),
                        (New-TextItem "Ideal for Final Approach and Take-Off (FATO) and Touchdown and Lift-Off (TLOF) areas, these lights deliver dependable performance in both day and night operations.")
                    )
                    image = New-AssetValue "/heliport-vertiports/fato.png"
                    imageAlt = "Engineering Precision"
                    reverse = $false
                    keytitle = "Key Features:"
                    points = @(
                        (New-SimplePoint "Omnidirectional light output for uniform visibility"),
                        (New-SimplePoint "Low power consumption (approximately 15W)"),
                        (New-SimplePoint "Long-life integrated LED (up to 100,000 hours)"),
                        (New-SimplePoint "IP67-rated for dust and water protection"),
                        (New-SimplePoint "High-strength cast aluminium construction"),
                        (New-SimplePoint "Night Vision Goggle (NVG) compatibility with optional IR LED"),
                        (New-SimplePoint "Designed to withstand extreme temperatures (-40C to +60C)")
                    )
                    greytitle = "Why It Matters"
                    greypara = "Flush-mounted lighting eliminates surface obstructions while maintaining optimal visibility making it ideal for high-traffic or space-constrained heliports and vertiports."
                }
            )
            hoodedLights = @(
                @{
                    component = "hv_left_right_section_item"
                    title = "Hooded LED Floodlights"
                    subtitle = "High-Performance Surface Illumination"
                    paragraphs = @(
                        (New-TextItem "Crantron's hooded LED floodlights are engineered to illuminate landing zones, surrounding terrain, and potential obstacles, providing pilots with enhanced situational awareness during approach and landing."),
                        (New-TextItem "The integrated hood minimizes glare, ensuring visibility without compromising pilot comfort or safety.")
                    )
                    image = New-AssetValue "/heliport-vertiports/hooded.png"
                    imageAlt = "Engineering Precision"
                    reverse = $true
                    keytitle = "Key Features:"
                    points = @(
                        (New-SimplePoint "High-intensity LED lighting with up to 100,000-hour lifespan"),
                        (New-SimplePoint "Anti-glare hood design for pilot-friendly operation"),
                        (New-SimplePoint "IP65-rated for outdoor durability"),
                        (New-SimplePoint "High-efficiency optical system with minimal light spill"),
                        (New-SimplePoint "Designed for operation in harsh environments (-30C to +70C)"),
                        (New-SimplePoint "Stable performance in high wind conditions"),
                        (New-SimplePoint "Adjustable light intensity options")
                    )
                    greytitle = "Why It Matters"
                    greypara = "Improves landing accuracy by giving pilots a clear, well-lit view of terrain conditions and potential hazards"
                }
            )
            windcone = @(
                @{
                    component = "hv_left_right_section_item"
                    title = "Illuminated Wind Direction Indicator (Windcone)"
                    subtitle = "Accurate Wind Visibility for Safer Landings"
                    paragraphs = @(
                        (New-TextItem "Wind awareness is critical for safe helicopter and eVTOL operations. Crantron's illuminated wind direction indicators provide clear, real-time wind visibility even in low-light and challenging weather conditions."),
                        (New-TextItem "Fully aligned with aviation requirements, these systems ensure pilots can easily interpret wind conditions from a distance.")
                    )
                    image = New-AssetValue "/heliport-vertiports/wind.png"
                    imageAlt = "Engineering Precision"
                    reverse = $false
                    keytitle = "Key Features:"
                    points = @(
                        (New-SimplePoint "Clearly visible from long distances (up to 200 meters)"),
                        (New-SimplePoint "Available in internally and externally illuminated configurations"),
                        (New-SimplePoint "Constructed with stainless steel or marine-grade coated poles"),
                        (New-SimplePoint "Designed to withstand extreme wind speeds"),
                        (New-SimplePoint "Smooth 360 rotation for accurate wind indication"),
                        (New-SimplePoint "Multiple windsock sizes available"),
                        (New-SimplePoint "Optional tiltable pole for simplified maintenance")
                    )
                    greytitle = "Why It Matters"
                    greypara = "Provides essential environmental information, enabling safer, more controlled landing and take-off operations."
                }
            )
            future = @(
                @{
                    component = "urban_section"
                    btn = "Inquire Now"
                    title = "Built for the Future of Urban Air Mobility"
                    subtitle = "Supporting Next-Generation Aviation"
                    description1 = "Crantron's lighting solutions are designed to support the growth of Urban Air Mobility (UAM) and electric aviation infrastructure."
                    description2 = ""
                    solutions = @(
                        (New-TextItem "Compatible with modern eVTOL platforms"),
                        (New-TextItem "Designed for high-frequency operations"),
                        (New-TextItem "Scalable for future expansion"),
                        (New-TextItem "Low maintenance with long operational life"),
                        (New-TextItem "Proven performance in critical aviation environments")
                    )
                    image1 = New-AssetValue "/hv1.png"
                    image2 = New-AssetValue "/hv2.png"
                }
            )
            faq = @(@{ component = "faq_section"; heading = "Frequently Asked Questions"; description = ""; assistanceHeading = "Need Help ?"; assistanceDescription = "Need reliable solutions or urgent support? Get in touch with our expert team today."; contactPhone = "+44 191 640 75 03"; contactEmail = "info@crantonelectric.com"; image = New-AssetValue "/faqs/6.png" })
        }
    },
    @{
        slug = "obstruction-lighting-solutions"; name = "Obstruction Lighting Solutions"; content = @{
            component = "obstruction_solution_page"
            hero = @(@{ component = "page_hero"; title = "Obstruction Lighting Solutions"; backgroundImage = New-AssetValue "/obstruction-lighting/hero.png" })
            intro = @(@{ component = "reliable_intro_section"; title = "Obstruction Lighting Solutions for Safer Airspace"; description = "Cranton obstruction lighting solutions are engineered to mark tall structures and potential hazards, helping pilots maintain safe navigation in all conditions."; image = New-AssetValue "/obstruction-lighting/obstract1.png"; buttonText = "Request a Quote"; buttonHref = "/contact" })
            features = @(@{ component = "feature_cards_section"; heading = "Engineered for Performance & Reliability"; para = ""; features = @(
                (New-FeatureCard "/portable-lighting/1.png" "High-Visibility Aviation Warning Systems" "Designed to provide clear and reliable obstruction marking for enhanced airspace safety."),
                (New-FeatureCard "/portable-lighting/2.png" "Durable Weather-Resistant Construction" "Built to perform in harsh offshore, industrial, coastal, and remote environmental conditions."),
                (New-FeatureCard "/portable-lighting/3.png" "Energy-Efficient LED Technology" "Advanced LED systems deliver long operational life with low power consumption and minimal maintenance."),
                (New-FeatureCard "/portable-lighting/4.png" "Compliant & Reliable Operation" "Engineered to meet international aviation obstruction lighting standards for dependable continuous performance.")
            ) })
            lowerSections = @(
                @{ component = "black_split_section_item"; id = "low-intensity"; title = "Low Intensity Obstruction Lights"; model = "For Close-Range Visibility & Marking"; description = "Low intensity lights are designed for structures with lower heights or where close-range visibility is required."; features = @((New-TextItem "Energy-efficient LED technology"),(New-TextItem "Continuous steady lighting output"),(New-TextItem "Compact and low-maintenance design"),(New-TextItem "Suitable for low-height structures")); image = New-AssetValue "/obstruction-lighting/low-intensity.png"; imageAlt = "Low Intensity Obstruction Light" },
                @{ component = "black_split_section_item"; id = "medium-intensity"; title = "Medium Intensity Obstruction Lights"; model = "Balanced Visibility for Mid-Height Structures"; description = "Medium intensity lights provide higher brightness and are typically used on structures of moderate height."; features = @((New-TextItem "High-visibility flashing or steady modes"),(New-TextItem "Designed for mid-range obstruction marking"),(New-TextItem "Day and night operational capability"),(New-TextItem "Durable and weather-resistant")); image = New-AssetValue "/obstruction-lighting/medium-intensity.png"; imageAlt = "Dual Mode Obstruction Light" }
            )
            upperSections = @(
                @{ component = "black_split_section_item"; id = "high-intensity"; title = "High Intensity Obstruction Lights"; model = "Maximum Visibility for Tall Structures"; description = "High intensity obstruction lights are used for very tall structures where maximum visibility is critical."; features = @((New-TextItem "Ultra-high intensity output"),(New-TextItem "Daytime and nighttime visibility"),(New-TextItem "Advanced control and monitoring systems"),(New-TextItem "Designed for critical infrastructure")); image = New-AssetValue "/activities-aircraft/day-night.png"; imageAlt = "Medium Intensity Obstruction Light" },
                @{ component = "black_split_section_item"; id = "solar-obstruction"; title = "Solar-Powered Obstruction Lights"; model = "Energy-Efficient & Independent Operation"; description = "Solar obstruction lights provide a sustainable solution by operating independently of grid power."; features = @((New-TextItem "Solar-powered with battery backup"),(New-TextItem "No external power required"),(New-TextItem "Easy installation and low maintenance"),(New-TextItem "Environmentally friendly solution")); image = New-AssetValue "/activities-aircraft/maximumrange.png"; imageAlt = "High Intensity Obstruction Light" }
            )
            ledSection = @(@{ component = "single_split_section_item"; id = "dual-lighting"; title = "LED Obstruction Lighting Systems"; model = "Advanced Technology for Long-Term Performance"; description = "LED-based obstruction lighting systems deliver superior efficiency, longer lifespan, and consistent performance."; features = @((New-TextItem "Long operational life"),(New-TextItem "Low power consumption"),(New-TextItem "High reliability"),(New-TextItem "Minimal maintenance")); image = New-AssetValue "/obstruction-lighting/2.png"; imageAlt = "Aviation Warning Light" })
            steps = @(@{ component = "steps_section"; title = "Built for Reliability & Compliance"; description = "Our obstruction lighting systems are engineered to perform in harsh environments while maintaining consistent visibility and operational efficiency."; steps = @(
                (New-StepItem "01" "High-Intensity LED Technology" "Delivers powerful illumination for maximum visibility in all conditions while maintaining energy efficiency." "/obstruction-lighting/step1.png"),
                (New-StepItem "02" "Weather & Corrosion-Resistant Design" "Built to withstand harsh environmental conditions, ensuring reliable performance over time." "/obstruction-lighting/step2.png"),
                (New-StepItem "03" "Long Operational Lifespan" "Engineered for extended use, reducing the need for frequent replacements." "/obstruction-lighting/step3.png"),
                (New-StepItem "04" "Low Maintenance Requirements" "Designed for minimal upkeep, helping reduce operational costs and downtime." "/obstruction-lighting/step4.png")
            ) })
            industries = @(@{ component = "industries_section"; heading = "Where It's Used"; industries = @(
                (New-IndustryItem "High-rise buildings" "/portable-lighting/use1.png"),
                (New-IndustryItem "Communication towers" "/portable-lighting/use2.png"),
                (New-IndustryItem "Industrial plants" "/portable-lighting/use3.png"),
                (New-IndustryItem "Bridges and infrastructure" "/portable-lighting/use4.png"),
                (New-IndustryItem "Wind turbines and cranes" "/portable-lighting/use1.png")
            ) })
            faq = @(@{ component = "faq_section"; heading = "Frequently Asked Questions"; description = ""; assistanceHeading = "Need Help ?"; assistanceDescription = "Our lighting specialists are ready to help you select the perfect obstruction lighting solution for your operational needs."; contactPhone = "+44 191 640 75 03"; contactEmail = "info@crantonelectric.com"; image = New-AssetValue "/faqs/5.png" })
            cta = @(@{ component = "cta_section_content"; heading = "Need an Obstruction Lighting Solution?"; description = "Tell us about your project requirements and our experts will help you design the right solution for your operational needs."; buttonText = "Request a Quote"; buttonHref = "/contact" })
        }
    },
    @{
        slug = "activities-aircraft"; name = "Activities Aircraft"; content = @{
            component = "aircraft_page"
            hero = @(@{ component = "page_hero"; title = "Activities"; backgroundImage = New-AssetValue "/activities-aircraft/herobanner.png" })
            warningLights = @(@{ component = "aircraft_warning_section"; title = "Aircraft Warning Lights"; paragraphs = @((New-TextItem "Cranton provides high-performance aircraft warning lights designed to enhance aviation safety by ensuring clear visibility of tall structures and potential obstacles."),(New-TextItem "Built with advanced technology and durable materials, these systems offer long operational life, energy efficiency, and minimal maintenance.")); cards = @(
                @{ component = "warning_card_item"; id = "1"; title = "High-Visibility LED Technology"; icon = "light" },
                @{ component = "warning_card_item"; id = "2"; title = "Engineered for Compliance"; icon = "link" }
            ); image = New-AssetValue "/activities-aircraft/aircraft-warning-lights.png"; imageAlt = "Aircraft warning lights" })
            primarySections = @(
                @{ component = "aircraft_detail_section"; id = "essential-visibility"; title = "Essential Visibility: Low Intensity"; model = "L-810"; image = New-AssetValue "/activities-aircraft/essentialvisibility.png"; imageAlt = "Engineering Precision"; reverse = $true; details = @(
                    (New-PointItem "Application:" "Designed for nighttime obstruction marking on lower structures or as intermediate markers on taller towers."),
                    (New-PointItem "Design:" "Features a durable yellow housing with a specialized red prismatic dome for omnidirectional signaling."),
                    (New-PointItem "Mounting:" "Robust flange-mount base ensures stability in adverse wind conditions.")
                ) },
                @{ component = "aircraft_detail_section"; id = "robust-signaling"; title = "Robust Signaling: Medium Intensity (Type B & C)"; model = "Medium Intensity LED, Type-C & B"; description = "Engineered for reliable red beacon requirements, these units provide high-contrast visibility for nighttime operations."; image = New-AssetValue "/activities-aircraft/robust-signaling.png"; imageAlt = "Engineering Precision"; details = @(
                    (New-PointItem "Configuration:" "Available for Type B (Red Flashing) and Type C (Red Steady) applications."),
                    (New-PointItem "Build:" "Industrial yellow powder-coated housing with a heavy-duty clear lens assembly protecting the internal LED matrix."),
                    (New-PointItem "Thermal Management:" "Integrated cooling fins visible through the clear housing ensure LED longevity.")
                ) }
            )
            secondarySections = @(
                @{ component = "aircraft_detail_section"; title = "Day & Night Performance: Medium Intensity (Type A)"; model = "Medium Intensity LED, Type-A (Supports A/B & A/C)"; description = "A high-performance white flashing system designed for dual marking, ensuring visibility against bright daytime skies and transitioning for night operations."; image = New-AssetValue "/activities-aircraft/day-night.png"; imageAlt = "Engineering Precision"; reverse = $true; details = @(
                    (New-PointItem "Visual Details:" "Distinct blue housing with optimized internal LED arrangement designed for maximum light throw and efficiency."),
                    (New-PointItem "Versatility:" "Covers requirements for Type A (White Day/Night), combined with Type B or C capabilities.")
                ) },
                @{ component = "aircraft_detail_section"; id = "high-intensity"; title = "Maximum Range: High Intensity"; model = "High Intensity LED, Type-A"; image = New-AssetValue "/activities-aircraft/maximumrange.png"; imageAlt = "Engineering Precision"; details = @(
                    (New-PointItem "Application" "The critical solution for major structures exceeding 500ft and catenary support systems."),
                    (New-PointItem "Form Factor" "Linear panel design optimized for specific beam spread and intensity requirements."),
                    (New-PointItem "Durability" "Heavy-duty yellow metal enclosure with reinforced mounting brackets for high-altitude installation.")
                ) }
            )
        }
    },
    @{
        slug = "activities-firefighting-system"; name = "Activities Firefighting System"; content = @{
            component = "activity_content_page"
            hero = @(@{ component = "page_hero"; title = "Firefighting System"; backgroundImage = New-AssetValue "/firefighting-system/hero.png" })
            intro = @(@{ component = "activity_content_section"; topImages = @((New-ImageItem "/firefighting-system/left.png"),(New-ImageItem "/firefighting-system/right.png")); title = "Firefighting System"; paragraphs = @((New-TextItem "As per the norms of International Civil Aviation Organization, heliports should be equipped with Firefighting system on two sides."),(New-TextItem "Firefighting system includes water tanks, extinguishing agent foam, firefighting monitors, pumping and mixing station and the complete pipe work.")) })
            features = @(@{ component = "feature_cards_section"; heading = "Key Features"; para = ""; features = @(
                (New-FeatureCard "/firefighting-system/1.png" "Automated Suppression" "Quick-response automatic foam systems for immediate fire control."),
                (New-FeatureCard "/firefighting-system/2.png" "Advanced Monitoring" "High-performance firefighting monitors for precise water and foam delivery."),
                (New-FeatureCard "/firefighting-system/3.png" "ICAO Compliance" "Systems designed to meet H1, H2, and H3 safety standards."),
                (New-FeatureCard "/firefighting-system/4.png" "Reliable Infrastructure" "Durable pipework and pumping stations built for emergency readiness.")
            ) })
            sections = @(
                @{ component = "split_section_item"; title = "Specifications"; image = New-AssetValue "/firefighting-system/specification.png"; imageAlt = "Engineering Precision"; paragraphs = @((New-TextItem "Our firefighting systems are engineered to handle the unique challenges of heliport safety."),(New-TextItem "Each system is calibrated based on the heliport's operational category.")); points = @((New-SimplePoint "Flow Rates: Up to 800 LPM"),(New-SimplePoint "Suppression Agent: Heavy Foam Solution"),(New-SimplePoint "Activation: Manual & Automatic Options"),(New-SimplePoint "Standards: International ICAO Norms")) },
                @{ component = "split_section_item"; title = "Applications"; image = New-AssetValue "/firefighting-system/application.png"; imageAlt = "Engineering Precision"; reverse = $true; paragraphs = @((New-TextItem "Reliable fire suppression is critical for rooftop, offshore, and ground-level heliports."),(New-TextItem "We focus on rapid response times and ease of maintenance.")); points = @((New-SimplePoint "Rooftop Heliports"),(New-SimplePoint "Offshore Platforms"),(New-SimplePoint "Industrial Complexes")) }
            )
            cta = @(@{ component = "cta_section_content"; heading = "Ensure Your Heliport's Safety Today"; description = "Contact our fire safety experts to design a compliant and effective firefighting system for your heliport infrastructure."; buttonText = "Request a quote"; buttonHref = "/contact" })
        }
    },
    @{
        slug = "activities-helideck-consulting"; name = "Activities Helideck Consulting"; content = @{
            component = "image_intro_page"
            hero = @(@{ component = "page_hero"; title = "Helideck Consulting"; backgroundImage = New-AssetValue "/activities-helideck/hero.png" })
            intro = @(@{ component = "image_content_section_block"; image = New-AssetValue "/helideck-consulting/helideck-consulting.png"; imageAlt = "Helideck consulting"; title = "Helideck Consulting"; paragraphs = @((New-TextItem "We are industry experts and provide you the most cost effective and up to date helideck solutions based on your requirements."),(New-TextItem "Our in-house engineering staff can design everything for a complete helipad installation.")); subTitle = "Our Consultation Consists Of"; points = @((New-SimplePoint "Drafting the primary plan / concept of the helideck"),(New-SimplePoint "Preparing detailed planning based on the approved concept"),(New-SimplePoint "Submission and approvals from concerned departments / officials"),(New-SimplePoint "Associating with related authorities and agencies to meet applicable standards.")) })
            features = @(@{ component = "feature_cards_section"; heading = "Key Features"; para = ""; features = @(
                (New-FeatureCard "/activities-helideck/1.png" "Expert Guidance" "Provides professional consulting based on industry knowledge and experience."),
                (New-FeatureCard "/activities-helideck/2.png" "Custom Project Planning " "We follow strict quality standards to ensure all systems are safe, reliable, and durable, every time."),
                (New-FeatureCard "/activities-helideck/3.png" "Regulatory Compliance" "Ensures all designs meet international aviation and safety standards."),
                (New-FeatureCard "/activities-helideck/4.png" "End-to-End Support" "Covers planning, design, approvals, and coordination.")
            ) })
            sections = @(
                @{ component = "split_section_item"; title = "Specifications"; image = New-AssetValue "/activities-helideck/specification.png"; imageAlt = "Engineering Precision"; paragraphs = @((New-TextItem "Helideck consulting services are designed to support clients throughout the planning and development process."),(New-TextItem "We work closely with clients and regulatory authorities to ensure that all designs meet aviation standards.")); points = @((New-SimplePoint "Service Type: Consulting & Planning"),(New-SimplePoint "Approach: Custom Project Based"),(New-SimplePoint "Compliance: Aviation Standards"),(New-SimplePoint "Support: End-to-End")) },
                @{ component = "split_section_item"; title = "Applications"; image = New-AssetValue "/helideck-consulting/applications.png"; imageAlt = "Engineering Precision"; reverse = $true; paragraphs = @((New-TextItem "Helideck consulting services are used in projects where proper planning, safety, and regulatory compliance are essential."),(New-TextItem "They are commonly applied in offshore platforms, rooftop helipads, and aviation-related developments.")); points = @((New-SimplePoint "Offshore Projects"),(New-SimplePoint "Rooftop Helipads"),(New-SimplePoint "Aviation Facilities")) }
            )
            cta = @(@{ component = "cta_section_content"; heading = "Need a Custom Helideck Solution?"; description = "Get in touch with our experts to discuss your project requirements and receive a tailored helideck solution built for safety, performance, and long-term reliability."; buttonText = "Request a Quote"; buttonHref = "/contact" })
        }
    },
    @{
        slug = "activities-helideck-lighting"; name = "Activities Helideck Lighting"; content = @{
            component = "activity_content_page"
            hero = @(@{ component = "page_hero"; title = "Helideck Lighting"; backgroundImage = New-AssetValue "/helideck-lighting/hero.png" })
            intro = @(@{ component = "activity_content_section"; topImages = @((New-ImageItem "/helideck-lighting/helipad.png")); title = "Helideck Lighting"; paragraphs = @((New-TextItem "A reliable and well-functioning helipad LED lighting system is an essential factor for helideck or helipad operations."),(New-TextItem "Our lighting systems are made with top quality products and use industry standards by collaborating with world-renowned brands.")); listBlocks = @(
                @{ component = "list_block_section"; title = "Our Helipad Lighting Products Includes"; description = "Get detailed technical specifications tailored to your project requirements."; halfWidthDescription = $true; type = "product"; items = @((New-SimplePoint "LED Perimeter Lights (Surface Mounted)"),(New-SimplePoint "LED Identification Beacon"),(New-SimplePoint "LED Perimeter Lights (Flush Mounted)"),(New-SimplePoint "LED Low Intensity obstruction lights"),(New-SimplePoint "LED Floodlights"),(New-SimplePoint "Mimic Lights"),(New-SimplePoint "LED Wind direction indicator"),(New-SimplePoint "TD/PM, Circle Zone"),(New-SimplePoint "LED Helipad Circle Lights"),(New-SimplePoint "Controller")) }
            ) })
            features = @(@{ component = "feature_cards_section"; heading = "Key Features"; para = ""; features = @(
                (New-FeatureCard "/helideck-lighting/1.png" "Advanced LED Tech" "High-efficiency LEDs for maximum visibility and energy savings."),
                (New-FeatureCard "/helideck-lighting/2.png" "Weather Resistant" "Designed to operate reliably in extreme marine and industrial climates."),
                (New-FeatureCard "/helideck-lighting/3.png" "Global Compliance" "Full adherence to ICAO Annex 14 and FAA lighting standards."),
                (New-FeatureCard "/helideck-lighting/4.png" "Smart Control Systems" "Centralized controllers for easy management of all lighting zones.")
            ) })
            sections = @(
                @{ component = "split_section_item"; title = "Specifications"; image = New-AssetValue "/helideck-lighting/specification.png"; imageAlt = "Engineering Precision"; paragraphs = @((New-TextItem "Our lighting solutions focus on durability and precision."),(New-TextItem "The systems are engineered for low maintenance and high MTBF.")); points = @((New-SimplePoint "Standard: ICAO / FAA Compliant"),(New-SimplePoint "Voltage: 100-240V AC / 24V DC"),(New-SimplePoint "IP Rating: IP66 / IP67 Weatherproof"),(New-SimplePoint "Lifespan: 50,000+ Hours LED")) },
                @{ component = "split_section_item"; title = "Applications"; image = New-AssetValue "/helideck-lighting/application.png"; imageAlt = "Engineering Precision"; reverse = $true; paragraphs = @((New-TextItem "Helideck lighting is essential for various platforms, including offshore drilling rigs, hospital rooftops, and commercial aviation terminals."),(New-TextItem "These systems are tailored to each site's specific physical constraints and operational needs.")); points = @((New-SimplePoint "Marine & Offshore"),(New-SimplePoint "Medical Helipads"),(New-SimplePoint "VIP Terminals")) }
            )
            cta = @(@{ component = "cta_section_content"; heading = "Illuminate Your Flight Operations"; description = "Contact our engineering team to design a complete, compliant lighting solution for your helideck or heliport."; buttonText = "Request a quote"; buttonHref = "/contact" })
        }
    },
    @{
        slug = "activities-helideck-manufacturing"; name = "Activities Helideck Manufacturing"; content = @{
            component = "activity_content_page"
            hero = @(@{ component = "page_hero"; title = "Helideck Manufacturing"; backgroundImage = New-AssetValue "/helideck-manufacturing/hero.png" })
            intro = @(@{ component = "activity_content_section"; topImages = @((New-ImageItem "/helideck-manufacturing/manufacturing-1.png"),(New-ImageItem "/helideck-manufacturing/manufacturing-2.png")); title = "Manufacturing & Construction Of Helidecks"; paragraphs = @((New-TextItem "We offer a complete range of repair, refurbishing and modernization services for existing helidecks.")); listBlocks = @(
                @{ component = "list_block_section"; title = "Services Offered By Cranton Electrical"; description = "Cranton Electrical is prepared to perform the following services for our clients to meet their specific project requirements."; halfWidthDescription = $false; type = "check"; items = @((New-SimplePoint "Preparation of primary layout design for new helidecks."),(New-SimplePoint "Reconstruction of existing helidecks."),(New-SimplePoint "Condition assessment, maintenance and performance inspection reports."),(New-SimplePoint "Budgetary planning.")) },
                @{ component = "list_block_section"; title = "Benefits For Operator"; description = ""; halfWidthDescription = $false; type = "check"; items = @((New-SimplePoint "Reduce risk of accident during takeoff and landing phases."),(New-SimplePoint "Increase the overall safe service of the helideck."),(New-SimplePoint "Reduce project risk and budget."),(New-SimplePoint "Compliance with all regulatory requirements.")) }
            ) })
            features = @(@{ component = "feature_cards_section"; heading = "Key Features"; para = ""; features = @(
                (New-FeatureCard "/helideck-manufacturing/1.png" "End-to-End Execution" "Detailed inspection to identify damage and performance issues."),
                (New-FeatureCard "/helideck-manufacturing/2.png" "Custom Helideck Design" "Provides effective repair and modernization of existing helidecks."),
                (New-FeatureCard "/helideck-manufacturing/3.png" "High-Quality Materials" "Ensures refurbished systems meet current aviation standards."),
                (New-FeatureCard "/helideck-manufacturing/4.png" "Precision Engineering" "Improves durability and extends the operational life of the helideck.")
            ) })
            sections = @(
                @{ component = "split_section_item"; title = "Specifications"; image = New-AssetValue "/helideck-manufacturing/specification.png"; imageAlt = "Engineering Precision"; paragraphs = @((New-TextItem "Refurbishing services are designed to restore and upgrade existing helidecks to meet modern safety and performance standards."),(New-TextItem "Our approach ensures structural integrity, improved performance, and compliance with aviation regulations.")); points = @((New-SimplePoint "Service Type: Refurbishment & Upgrade"),(New-SimplePoint "Process: Inspection, Repair & Enhancement"),(New-SimplePoint "Compliance: Aviation Standards"),(New-SimplePoint "Outcome: Improved Performance & Safety")) },
                @{ component = "split_section_item"; title = "Applications"; image = New-AssetValue "/helideck-manufacturing/application.png"; imageAlt = "Engineering Precision"; reverse = $true; paragraphs = @((New-TextItem "Refurbishing services are used in projects where existing helidecks require repair, upgrade, or performance improvement."),(New-TextItem "They are widely applied in offshore platforms, rooftop helipads, and industrial facilities.")); points = @((New-SimplePoint "Offshore Projects"),(New-SimplePoint "Rooftop Helipads"),(New-SimplePoint "Industrial Sites")) }
            )
            cta = @(@{ component = "cta_section_content"; heading = "Need a Custom Helideck Solution?"; description = "Get in touch with our experts to discuss your manufacturing and construction requirements and receive a tailored helideck solution built for safety and reliability."; buttonText = "Request a Quote"; buttonHref = "/contact" })
        }
    },
    @{
        slug = "activities-helideck-refurbishing"; name = "Activities Helideck Refurbishing"; content = @{
            component = "image_intro_page"
            hero = @(@{ component = "page_hero"; title = "Refurbishing Helidecks"; backgroundImage = New-AssetValue "/activities-refurbishing/banner.png" })
            intro = @(@{ component = "image_content_section_block"; image = New-AssetValue "/activities-refurbishing/refurbishing-existing-helidecks.png"; imageAlt = "Refurbishing Existing Helidecks"; title = "Refurbishing Existing Helidecks"; paragraphs = @((New-TextItem "Many helidecks that are decommissioned due to lack of quality or any other damages can be inspected by our team of professionals and issues may be identified.")); subTitle = ""; points = @() })
            features = @(@{ component = "feature_cards_section"; heading = "Key Features"; para = ""; features = @(
                (New-FeatureCard "/activities-refurbishing/1.png" "Condition Assessment" "Detailed inspection to identify damage and performance issues."),
                (New-FeatureCard "/activities-refurbishing/2.png" "Repair & Upgrade Solutions" "Provides effective repair and modernization of existing helidecks."),
                (New-FeatureCard "/activities-refurbishing/3.png" "Safety Compliance" "Ensures refurbished systems meet current aviation standards."),
                (New-FeatureCard "/activities-refurbishing/4.png" "Extended Lifespan" "Improves durability and extends the operational life of the helideck.")
            ) })
            sections = @(
                @{ component = "split_section_item"; title = "Specifications"; image = New-AssetValue "/activities-refurbishing/specification.png"; imageAlt = "Engineering Precision"; paragraphs = @((New-TextItem "Refurbishing services are designed to restore and upgrade existing helidecks to meet modern safety and performance standards."),(New-TextItem "Our approach ensures structural integrity, improved performance, and compliance with aviation regulations.")); points = @((New-SimplePoint "Service Type: Refurbishment & Upgrade"),(New-SimplePoint "Process: Inspection, Repair & Enhancement"),(New-SimplePoint "Compliance: Aviation Standards"),(New-SimplePoint "Outcome: Improved Performance & Safety")) },
                @{ component = "split_section_item"; title = "Applications"; image = New-AssetValue "/activities-refurbishing/application.png"; imageAlt = "Engineering Precision"; reverse = $true; paragraphs = @((New-TextItem "Refurbishing services are used in projects where existing helidecks require repair, upgrade, or performance improvement."),(New-TextItem "They are widely applied in offshore platforms, rooftop helipads, and industrial facilities.")); points = @((New-SimplePoint "Offshore Projects"),(New-SimplePoint "Rooftop Helipads"),(New-SimplePoint "Industrial Sites")) }
            )
            cta = @(@{ component = "cta_section_content"; heading = "Need a Custom Helideck Solution?"; description = "Get in touch with our experts to discuss your project requirements and receive a tailored helideck solution built for safety, performance, and long-term reliability."; buttonText = "Request a Quote"; buttonHref = "/contact" })
        }
    },
    @{
        slug = "activities-heliport-platform-mounting"; name = "Activities Heliport Platform Mounting"; content = @{
            component = "image_intro_page"
            hero = @(@{ component = "page_hero"; title = "Heliport Platform Mounting"; backgroundImage = New-AssetValue "/heliport-mounting/hero.png" })
            intro = @(@{ component = "image_content_section_block"; image = New-AssetValue "/heliport-mounting/helipad.webp"; imageAlt = "Heliport Platform Mounting"; title = "Heliport Platform Mounting"; paragraphs = @((New-TextItem "Heliport platform mounting involves complex engineering to ensure the structural integrity and stability of heliports on various surfaces.")); subTitle = ""; points = @() })
            features = @(@{ component = "feature_cards_section"; heading = "Key Features"; para = ""; features = @(
                (New-FeatureCard "/heliport-mounting/1.png" "Vibration Isolation System" "Reduces vibration and noise transfer to the building structure."),
                (New-FeatureCard "/heliport-mounting/2.png" "Stable Platform Support" "Ensures secure and balanced mounting of the helideck."),
                (New-FeatureCard "/heliport-mounting/3.png" "Custom Mounting Design" "Designed according to structural and site-specific requirements."),
                (New-FeatureCard "/heliport-mounting/4.png" "Improved Safety" "Improves operational safety and overall helideck performance.")
            ) })
            sections = @(
                @{ component = "split_section_item"; title = "Specifications"; image = New-AssetValue "/heliport-mounting/specification.png"; imageAlt = "Engineering Precision"; paragraphs = @((New-TextItem "Our platform mounting services focus on delivering high-performance structural foundations for heliports."),(New-TextItem "Every project involves a detailed analysis of site conditions and operational requirements.")); points = @((New-SimplePoint "Service Type: Platform Mounting"),(New-SimplePoint "Process: Site Analysis & Engineering"),(New-SimplePoint "Compliance: Aviation Standards"),(New-SimplePoint "Outcome: Stable & Secure Infrastructure")) },
                @{ component = "split_section_item"; title = "Applications"; image = New-AssetValue "/heliport-mounting/application.png"; imageAlt = "Engineering Precision"; reverse = $true; paragraphs = @((New-TextItem "Heliport platform mounting is essential for urban rooftop developments, offshore energy platforms, and remote industrial facilities."),(New-TextItem "These services ensure that helicopters can land safely where ground-level landing pads are not feasible.")); points = @((New-SimplePoint "Offshore Platforms"),(New-SimplePoint "Urban Rooftops"),(New-SimplePoint "Industrial Complexes")) }
            )
            cta = @(@{ component = "cta_section_content"; heading = "Need a Custom Heliport Solution?"; description = "Get in touch with our experts to discuss your platform mounting requirements and receive a tailored heliport solution built for safety and reliability."; buttonText = "Request a Quote"; buttonHref = "/contact" })
        }
    }
)

foreach ($story in $stories) {
    Upsert-Story -Slug $story.slug -StoryPayload @{
        name = $story.name
        slug = $story.slug
        content = $story.content
        is_folder = $false
    } | Out-Null
}

Write-Host "Storyblok non-home page setup completed."
