type ColHeadingPara = {
  title?: string;
  description: string;
};

export default function ColHeadingPara({
  title,
  description,
}: ColHeadingPara) {
  return (
    <div className="space-y-1.5 py-3">
      
      <p className="text-[16px] md:text-xl font-semibold">
        {title}
      </p>

      <p className="text-[14px] md:text-[16px] leading-relaxed text-[#333333]">
        {description}
      </p>

    </div>
  );
}