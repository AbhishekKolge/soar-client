import { Link } from "react-router-dom";

const WidgetContainer = (props) => {
  const { title, children, detailsTo } = props;
  return (
    <div className="grid gap-[22px] lg:gap-[20px] h-full">
      <div className="flex items-center justify-between">
        {title && (
          <h3 className="text-primary text-[16px] lg:text-[22px] font-semibold">
            {title}
          </h3>
        )}
        {detailsTo && (
          <Link
            to={detailsTo}
            className="text-primary text-[14px] lg:text-[17px] font-semibold"
          >
            See All
          </Link>
        )}
      </div>
      {children}
    </div>
  );
};

export default WidgetContainer;
