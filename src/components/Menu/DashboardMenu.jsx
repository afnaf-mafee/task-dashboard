import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/auth/authSlice";
import { Button } from "antd";
import {
  LogoutOutlined,
  DashboardOutlined,
  UserOutlined,
  CheckSquareOutlined,
  CreditCardOutlined,
  GatewayOutlined,
  GiftOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { TbCreditCardPay } from "react-icons/tb";
import { FaBell, FaRegBell, FaRegImages } from "react-icons/fa";

const DashboardMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // ✅ MENU WITH ICONS
  const menuItems = [
    { name: "Dashboard", path: "/", icon: <DashboardOutlined /> },
    { name: "User List", path: "/all-users", icon: <UserOutlined /> },
    { name: "Tasks", path: "/task", icon: <CheckSquareOutlined /> },
    { name: "Payments", path: "/all-payments", icon: <CreditCardOutlined /> },
  { name: "Gateway", path: "/gateway", icon: <GatewayOutlined /> },
    { name: "Offer", path: "/offer", icon: <GiftOutlined /> },
    { name: "Payout History", path: "/payout", icon: <HistoryOutlined /> },
    {
      name: "Payout Request",
      path: "/payout-request",
      icon: <TbCreditCardPay />,
    },{
      name: "Banner",
      path: "/banner",
      icon: <FaRegImages />,
    },{
      name: "Notification",
      path: "/notification",
      icon: <FaRegBell  />,
    },
  ];

  return (
    <section
      className=" font-urbanist
      h-[90vh] w-[260px] mt-10 ms-10
      rounded-3xl
      backdrop-blur-xl
      bg-white/10
      border border-white/20
      shadow-2xl
      p-6
      text-white
    "
    >
      <div className="flex flex-col justify-between h-full">
        {/* PROFILE */}
        <div>
          <div className="mb-8 text-center">
            <img
              className="
                w-[90px] h-[90px]
                rounded-full
                object-cover
                ring-4 ring-purple-500/60
                shadow-lg mx-auto
              "
              src="https://img.freepik.com/premium-vector/young-man-avatar-character-due-avatar-man-vector-icon-cartoon-illustration_1186924-4438.jpg"
            />

            <h3 className="mt-4 text-purple-950 text-lg font-semibold tracking-wide">
              Sayma Rahman
            </h3>

            <p className="text-sm  font-semibold text-purple-950">
              Admin Dashboard
            </p>
          </div>

          {/* MENU */}
          <ul className=" font-medium text-purple-950">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className="
                  flex items-center gap-3
                  px-4 py-3
                  rounded-xl
                  transition-all duration-300
                  bg-white/5
                  hover:bg-white/20
                  hover:backdrop-blur-lg
                  hover:scale-[1.03]
                  hover:shadow-lg
                "
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* LOGOUT */}
        <Button
          onClick={handleLogout}
          icon={<LogoutOutlined />}
          className="
            !h-12 !rounded-xl
            !text-white
            !font-semibold
            !border-none
            !bg-gradient-to-r from-purple-500 to-indigo-500
            hover:!scale-105
            transition-all duration-300
            shadow-xl
          "
        >
          Logout
        </Button>
      </div>
    </section>
  );
};

export default DashboardMenu;
