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
    param(
        [hashtable]$Definition
    )

    $existing = $script:existingComponents | Where-Object { $_.name -eq $Definition.name } | Select-Object -First 1

    $payload = @{
        component = $Definition
    }

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

    return @{
        filename = $Filename
    }
}

$componentsResponse = Invoke-StoryblokJson -Method "GET" -Uri "https://mapi.storyblok.com/v1/spaces/$spaceId/components" -Body $null
$script:existingComponents = @($componentsResponse.components)

$componentDefinitions = @(
    @{
        name = "service_item"
        display_name = "Service Item"
        is_nestable = $true
        is_root = $false
        schema = @{
            title = @{ type = "text" }
            description = @{ type = "textarea" }
            image = @{ type = "asset" }
            link = @{ type = "text" }
            ctaLabel = @{ type = "text" }
            ctaHref = @{ type = "text" }
        }
    },
    @{
        name = "building_block_item"
        display_name = "Building Block Item"
        is_nestable = $true
        is_root = $false
        schema = @{
            title = @{ type = "text" }
            description = @{ type = "textarea" }
            icon = @{ type = "asset" }
        }
    },
    @{
        name = "stats_item"
        display_name = "Stats Item"
        is_nestable = $true
        is_root = $false
        schema = @{
            label = @{ type = "text" }
            value = @{ type = "number" }
            suffix = @{ type = "text" }
        }
    },
    @{
        name = "why_choose_feature"
        display_name = "Why Choose Feature"
        is_nestable = $true
        is_root = $false
        schema = @{
            title = @{ type = "text" }
            description = @{ type = "textarea" }
        }
    },
    @{
        name = "insight_item"
        display_name = "Insight Item"
        is_nestable = $true
        is_root = $false
        schema = @{
            title = @{ type = "text" }
            image = @{ type = "asset" }
        }
    },
    @{
        name = "home_hero"
        display_name = "Home Hero"
        is_nestable = $true
        is_root = $false
        schema = @{
            title = @{ type = "textarea" }
            subtitle = @{ type = "textarea" }
            ctaLabel = @{ type = "text" }
            ctaHref = @{ type = "text" }
            video = @{ type = "asset" }
        }
    },
    @{
        name = "stats_section"
        display_name = "Stats Section"
        is_nestable = $true
        is_root = $false
        schema = @{
            image = @{ type = "asset" }
            heading = @{ type = "text" }
            paragraphs = @{ type = "textarea"; pos = 1 }
            ctaLabel = @{ type = "text" }
            ctaHref = @{ type = "text" }
            stats = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("stats_item") }
        }
    },
    @{
        name = "why_choose_us_section"
        display_name = "Why Choose Us Section"
        is_nestable = $true
        is_root = $false
        schema = @{
            heading = @{ type = "text" }
            description = @{ type = "textarea" }
            image = @{ type = "asset" }
            ctaLabel = @{ type = "text" }
            ctaHref = @{ type = "text" }
            features = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("why_choose_feature") }
        }
    },
    @{
        name = "insights_section"
        display_name = "Insights Section"
        is_nestable = $true
        is_root = $false
        schema = @{
            heading = @{ type = "text" }
            insights = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("insight_item") }
        }
    },
    @{
        name = "navbar_solution_item"
        display_name = "Navbar Solution Item"
        is_nestable = $true
        is_root = $false
        schema = @{
            name = @{ type = "text" }
            href = @{ type = "text" }
            hoverImage = @{ type = "asset" }
        }
    },
    @{
        name = "footer_link_item"
        display_name = "Footer Link Item"
        is_nestable = $true
        is_root = $false
        schema = @{
            label = @{ type = "text" }
            href = @{ type = "text" }
            download = @{ type = "boolean" }
        }
    },
    @{
        name = "footer_social_item"
        display_name = "Footer Social Item"
        is_nestable = $true
        is_root = $false
        schema = @{
            name = @{ type = "text" }
            href = @{ type = "text" }
        }
    },
    @{
        name = "navbar_settings"
        display_name = "Navbar Settings"
        is_nestable = $true
        is_root = $false
        schema = @{
            logo = @{ type = "asset" }
            contactEmail = @{ type = "text" }
            contactPhone = @{ type = "text" }
            addressLabel = @{ type = "textarea" }
            addressUrl = @{ type = "text" }
            primaryCtaLabel = @{ type = "text" }
            primaryCtaHref = @{ type = "text" }
            solutionItems = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("navbar_solution_item") }
        }
    },
    @{
        name = "footer_settings"
        display_name = "Footer Settings"
        is_nestable = $true
        is_root = $false
        schema = @{
            logo = @{ type = "asset" }
            description = @{ type = "textarea" }
            addressLabel = @{ type = "textarea" }
            addressUrl = @{ type = "text" }
            contactEmail = @{ type = "text" }
            contactPhone = @{ type = "text" }
            links = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("footer_link_item") }
            socialLinks = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("footer_social_item") }
            copyrightLabel = @{ type = "text" }
        }
    },
    @{
        name = "home_page"
        display_name = "Home Page"
        is_nestable = $false
        is_root = $true
        schema = @{
            hero = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("home_hero") }
            services = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("service_item") }
            building_blocks_heading = @{ type = "text" }
            building_blocks_description = @{ type = "textarea" }
            building_block_items = @{ type = "bloks"; restrict_components = $true; component_whitelist = @("building_block_item") }
            stats_section = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("stats_section") }
            why_choose_us = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("why_choose_us_section") }
            insights_section = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("insights_section") }
        }
    },
    @{
        name = "site_settings"
        display_name = "Site Settings"
        is_nestable = $false
        is_root = $true
        schema = @{
            navbar = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("navbar_settings") }
            footer = @{ type = "bloks"; restrict_components = $true; maximum = 1; component_whitelist = @("footer_settings") }
        }
    }
)

foreach ($definition in $componentDefinitions) {
    Upsert-Component -Definition $definition | Out-Null
}

$homeContent = @{
    component = "home_page"
    hero = @(
        @{
            component = "home_hero"
            title = "Powering the Future of`nVertical Aviation"
            subtitle = "Heliports, Vertiports, and Obstruction Lighting Built for Safety, Precision, and Performance"
            ctaLabel = "Explore Solutions"
            ctaHref = "/about"
            video = New-AssetValue "/home/hero-bg.mp4"
        }
    )
    services = @(
        @{
            component = "service_item"
            title = "Heliports & Vertiports Solutions"
            description = "High-strength, durable platform systems designed to provide secure and reliable landing surfaces for offshore and onshore helideck operations."
            image = New-AssetValue "/home/service-4.png"
            link = "/heliports-&-vertiports-solutions"
        },
        @{
            component = "service_item"
            title = "End-to-End Solutions for Heliports, Vertiports, & Obstruction Lighting"
            description = "We engineer future ready high-performance solutions for heliports, vertiports, and advanced air mobility sites with a focus on safety, precision, and compliance."
            link = "#"
            ctaLabel = "Inquire Now"
            ctaHref = "/contact"
        },
        @{
            component = "service_item"
            title = "Heliports & Vertiports Lighting Solutions"
            description = "Advanced lighting systems engineered for precision, visibility, and compliance, supporting safe take-off, landing, and ground operations."
            image = New-AssetValue "/home/service-5.png"
            link = "/heliports-&-vertiports-lighting-solutions"
        },
        @{
            component = "service_item"
            title = "Portable Helipads & Vertipads"
            description = "Rapid-deploy, modular landing solutions designed for temporary and emergency operations, ensuring safe and stable helicopter access across diverse terrains."
            image = New-AssetValue "/home/service-1.png"
            link = "/portable-helipads-and-vertipads"
        },
        @{
            component = "service_item"
            title = "Modular Floating Solutions"
            description = "Modular, easy-to-deploy floating systems designed for stability and versatility. Ideal for helipads, platforms, and marine applications, delivering reliable performance."
            image = New-AssetValue "/home/service-3.png"
            link = "/modular-floating-solutions"
        },
        @{
            component = "service_item"
            title = "Obstruction Lighting Solutions"
            description = "High-performance warning lights designed to enhance visibility of structures, ensuring aviation safety and regulatory compliance."
            image = New-AssetValue "/obs.png"
            link = "/obstruction-lighting-solutions"
        },
        @{
            component = "service_item"
            title = "Portable Lighting Solutions"
            description = "Self-powered, high-intensity lighting systems built for quick setup, enabling safe aviation operations in remote or time-critical environments."
            image = New-AssetValue "/home/service-7.png"
            link = "/portable-lighting-solutions"
        }
    )
    building_blocks_heading = "The Building Blocks of Safe & Reliable Vertiport & Heliport"
    building_blocks_description = "Cranton Heliport is engineered with precision, using high-performance materials and systems designed to meet demanding aviation standards. These core elements work together to deliver safety, durability, and long-term operational confidence."
    building_block_items = @(
        @{
            component = "building_block_item"
            title = "High-Performance Aluminium Profiles"
            description = "Precision-engineered aluminium profiles form the foundation of our heliport landing surfaces."
            icon = New-AssetValue "/home/block-card1.png"
        },
        @{
            component = "building_block_item"
            title = "Advanced Electrical & Lighting Systems"
            description = "Our integrated electrical systems ensure clear visibility and safe operations in all conditions."
            icon = New-AssetValue "/home/block-card2.png"
        },
        @{
            component = "building_block_item"
            title = "Integrated Helideck Systems"
            description = "Cranton helidecks are built for safe, stable, and reliable aviation operations, delivering certified landing environments with long-term durability and high performance."
            icon = New-AssetValue "/home/bc3.png"
        },
        @{
            component = "building_block_item"
            title = "Deck Platforms Fixed & Portable"
            description = "Cranton offers both permanent and portable helideck solutions designed for different operational requirements, providing reliable performance, flexibility."
            icon = New-AssetValue "/home/bc4.png"
        },
        @{
            component = "building_block_item"
            title = "Lighting Solutions  Fixed Systems"
            description = "Our fixed aviation lighting systems are designed to deliver clear visual guidance, enhanced night operations, and full compliance with heliport and helideck standards. Integrated perimeter lighting, approach lighting, and illuminated markings improve pilot visibility and operational safety in all weather conditions."
            icon = New-AssetValue "/home/bc5.png"
        },
        @{
            component = "building_block_item"
            title = "Lighting Solutions Portable Systems"
            description = "Cranton portable lighting solutions provide rapid-deployment illumination for temporary landing zones, emergency response operations, and remote-site aviation support. Lightweight, durable, and easy to transport, these systems ensure dependable visibility wherever operations are required."
            icon = New-AssetValue "/home/bc6.png"
        }
    )
    stats_section = @(
        @{
            component = "stats_section"
            image = New-AssetValue "/home/stats-left.png"
            heading = "Engineering Precision. Manufacturing Excellence"
            paragraphs = "Cranton is a specialist manufacturer and solutions provider for aviation and infrastructure systems, with a strong focus on helideck and helipad solutions, aviation lighting, and electrical safety equipment. We combine engineering expertise with in-house manufacturing to deliver products that meet the highest standards of safety, durability, and compliance.`n`nBuilt on a foundation of technical knowledge and practical experience, Cranton supports clients across aviation, offshore, healthcare, defense, and industrial sectors. Our products are designed to perform in demanding environments where reliability and precision are critical."
            ctaLabel = "About Us"
            ctaHref = "/about"
            stats = @(
                @{ component = "stats_item"; label = "Completed Projects"; value = "450"; suffix = "" },
                @{ component = "stats_item"; label = "Countries Served"; value = "32"; suffix = "+" },
                @{ component = "stats_item"; label = "Years of Experience"; value = "8"; suffix = "+" }
            )
        }
    )
    why_choose_us = @(
        @{
            component = "why_choose_us_section"
            heading = "Why Industry Leaders Choose Cranton"
            description = "From manufacturing precision to on-site readiness, Cranton delivers aviation, Vertiport & heliport solutions engineered for performance, compliance, and long-term reliability."
            image = New-AssetValue "/home/why-choose-us.png"
            ctaLabel = "Inquire Now"
            ctaHref = "/contact"
            features = @(
                @{
                    component = "why_choose_feature"
                    title = "Engineered for Compliance & Safety"
                    description = "Every solution is carefully designed to meet international aviation standards while ensuring safe, stable, and efficient helideck operations. Our systems are developed to support reliable performance while maintaining strict safety and operational compliance requirements."
                },
                @{
                    component = "why_choose_feature"
                    title = "Manufacturing-Driven Quality"
                    description = "We combine durable materials, precision engineering, and detailed quality control processes to deliver systems built for long-term performance. Every component is manufactured with consistency and accuracy to ensure dependable operation across demanding project environments."
                },
                @{
                    component = "why_choose_feature"
                    title = "Proven in Real-World Installations"
                    description = "Our solutions are successfully implemented across offshore platforms, rooftop helipads, and industrial aviation facilities worldwide. These completed installations demonstrate our practical experience in delivering reliable systems for complex operational environments and requirements."
                },
                @{
                    component = "why_choose_feature"
                    title = "Built to Support Your Project Goals"
                    description = "From planning to installation, every solution is tailored to match your operational requirements and long-term infrastructure objectives. We work closely with clients to deliver scalable, practical, and future-ready helideck systems for every project."
                }
            )
        }
    )
    insights_section = @(
        @{
            component = "insights_section"
            heading = "Insights That Power Smarter Decisions"
            insights = @(
                @{ component = "insight_item"; title = "What Is The Difference Between A Helipad And A Vertiport?"; image = New-AssetValue "/home/insights-1.png" },
                @{ component = "insight_item"; title = "Decoding The Visual Language Of Vertiport & Heliport Markings"; image = New-AssetValue "/home/insights-2.png" },
                @{ component = "insight_item"; title = "Differences Between Helicopter Landing Pads"; image = New-AssetValue "/home/insights-3.png" },
                @{ component = "insight_item"; title = "Aluminum Vertiports- The Future Of Green Landing Systems For EVTOL/VTOL?"; image = New-AssetValue "/home/insights-4.png" }
            )
        }
    )
}

$siteSettingsContent = @{
    component = "site_settings"
    navbar = @(
        @{
            component = "navbar_settings"
            logo = New-AssetValue "/nav-logo.png"
            contactEmail = "info@crantonelectric.com"
            contactPhone = "+44 191 640 75 03"
            addressLabel = "Office 11A, Design Works, William Street, Felling, NE10 0JP, United Kingdom."
            addressUrl = "https://www.google.com/maps/search/?api=1&query=Office+11A+Design+Works+William+Street+Felling+NE10+0JP+United+Kingdom"
            primaryCtaLabel = "Request a Quote"
            primaryCtaHref = "/contact"
            solutionItems = @(
                @{ component = "navbar_solution_item"; name = "Heliports & Vertiports Solutions"; href = "/heliports-&-vertiports-solutions"; hoverImage = New-AssetValue "/home/service-4.png" },
                @{ component = "navbar_solution_item"; name = "Portable Helipads & Vertipads"; href = "/portable-helipads-and-vertipads"; hoverImage = New-AssetValue "/home/service-1.png" },
                @{ component = "navbar_solution_item"; name = "Portable Lighting Solutions"; href = "/portable-lighting-solutions"; hoverImage = New-AssetValue "/home/service-7.png" },
                @{ component = "navbar_solution_item"; name = "Heliports & Vertiports Lighting Solutions"; href = "/heliports-&-vertiports-lighting-solutions"; hoverImage = New-AssetValue "/home/service-5.png" },
                @{ component = "navbar_solution_item"; name = "Modular Floating Solutions"; href = "/modular-floating-solutions"; hoverImage = New-AssetValue "/home/service-3.png" },
                @{ component = "navbar_solution_item"; name = "Obstruction Lighting Solutions"; href = "/obstruction-lighting-solutions"; hoverImage = New-AssetValue "/obs.png" }
            )
        }
    )
    footer = @(
        @{
            component = "footer_settings"
            logo = New-AssetValue "/footer-logo.png"
            description = "From precision-engineered deck platforms to advanced fixed and portable lighting systems, Cranton delivers aviation, vertiport, and heliport solutions built for safety, compliance, and long-term operational reliability."
            addressLabel = "Office 11A, Design Works, William Street, Felling, NE10 0JP, United Kingdom."
            addressUrl = "https://www.google.com/maps/search/?api=1&query=Office+11A+Design+Works+William+Street+Felling+NE10+0JP+United+Kingdom"
            contactEmail = "info@crantonelectric.com"
            contactPhone = "+44 191 640 75 03"
            links = @(
                @{ component = "footer_link_item"; label = "Home"; href = "/"; download = $false },
                @{ component = "footer_link_item"; label = "About Us"; href = "/about"; download = $false },
                @{ component = "footer_link_item"; label = "E-Brochure"; href = "/Cranton-E-Brochure.pdf"; download = $true },
                @{ component = "footer_link_item"; label = "Contact Us"; href = "/contact"; download = $false }
            )
            socialLinks = @(
                @{ component = "footer_social_item"; name = "LinkedIn"; href = "https://www.linkedin.com/company/cranton-electrical-limited-uk/" }
            )
            copyrightLabel = "Copyright © {year} All Rights Reserved."
        }
    )
}

Upsert-Story -Slug "home" -StoryPayload @{
    name = "Home"
    slug = "home"
    content = $homeContent
    is_folder = $false
}

Upsert-Story -Slug "site-settings" -StoryPayload @{
    name = "Site Settings"
    slug = "site-settings"
    content = $siteSettingsContent
    is_folder = $false
}

Write-Host "Storyblok home/schema setup completed."
