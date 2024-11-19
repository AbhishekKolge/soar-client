import { Outlet } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SettingsTab } from "../components";

const SettingLayout = () => {
  return (
    <Card>
      <CardHeader className="lg:pb-[41px]">
        <SettingsTab />
      </CardHeader>
      <CardContent>
        <Outlet />
      </CardContent>
    </Card>
  );
};

export default SettingLayout;
