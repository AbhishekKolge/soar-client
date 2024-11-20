import { Link } from "react-router-dom";

const WidgetContainer = (props) => {
  const { title, children, detailsTo } = props;
  return (
    <div className="grid gap-y-5 h-full grid-rows-[auto_1fr]">
      <div className="flex items-center justify-between">
        {title && (
          <h3 className="text-primary text-[22px] font-semibold leading-7">
            {title}
          </h3>
        )}
        {detailsTo && (
          <Link
            to={detailsTo}
            className="text-primary text-[17px] font-semibold leading-5"
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
