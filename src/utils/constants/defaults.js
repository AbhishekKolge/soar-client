import { ROUTES } from "./getters";
import { ICON } from "./icons";

export const DROPZONE_IMAGE_FORMAT = {
  "image/jpeg": [],
  "image/jpg": [],
  "image/png": [],
};

export const IMAGE_EXTENSIONS = ["jpeg", "jpg", "png"];

export const MAX_FILE_SIZE = 1024 * 1024;

export const UNITS = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

export const PAGE_SIZE = 10;

export const DEBOUNCE_TIME = 1000;

export const THROTTLE_TIME = 2000;

export const DEFAULT_PAGE = 1;

export const AUTH_STORAGE_NAME = "auth";

export const MOBILE_BREAKPOINT = 640;

export const TABLET_BREAKPOINT = 768;

export const DESKTOP_BREAKPOINT = 1024;

export const SIDEBAR_OPTIONS = [
  {
    title: "Dashboard",
    url: ROUTES.dashboard,
    icon: ICON.icons.home,
    iconDark: ICON.icons.homeDark,
  },
  {
    title: "Transactions",
    url: ROUTES.transaction,
    icon: ICON.icons.transaction,
    iconDark: ICON.icons.transactionDark,
  },
  {
    title: "Accounts",
    url: ROUTES.account,
    icon: ICON.icons.account,
    iconDark: ICON.icons.accountDark,
  },
  {
    title: "Investments",
    url: ROUTES.investment,
    icon: ICON.icons.investment,
    iconDark: ICON.icons.investmentDark,
  },
  {
    title: "Credit Cards",
    url: ROUTES.creditCard,
    icon: ICON.icons.creditCard,
    iconDark: ICON.icons.creditCardDark,
  },
  {
    title: "Loans",
    url: ROUTES.loan,
    icon: ICON.icons.loan,
    iconDark: ICON.icons.loanDark,
  },
  {
    title: "Services",
    url: ROUTES.service,
    icon: ICON.icons.services,
    iconDark: ICON.icons.servicesDark,
  },
  {
    title: "My Privileges",
    url: ROUTES.privilege,
    icon: ICON.icons.privileges,
    iconDark: ICON.icons.privilegesDark,
  },
  {
    title: "Setting",
    url: ROUTES.setting,
    icon: ICON.icons.setting,
    iconDark: ICON.icons.settingDark,
  },
];

export const SETTINGS_TAB_OPTIONS = [
  {
    title: "Edit Profile",
    url: ROUTES.profileSetting,
  },
  {
    title: "Preferences",
    url: ROUTES.preferenceSetting,
  },
  {
    title: "Security",
    url: ROUTES.securitySetting,
  },
];

export const TRANSACTION_METHOD_OPTIONS = [
  {
    label: "Debit",
    value: "DEBIT",
  },
  {
    label: "Credit",
    value: "CREDIT",
  },
];

const TRANSACTION_CATEGORY = {
  entertainment: "ENTERTAINMENT",
  investment: "INVESTMENT",
  billExpense: "BILL_EXPENSE",
  others: "OTHERS",
};

export const TRANSACTION_CATEGORY_OPTIONS = [
  {
    label: "Entertainment",
    value: TRANSACTION_CATEGORY.entertainment,
  },
  {
    label: "Investment",
    value: TRANSACTION_CATEGORY.investment,
  },
  {
    label: "Bill Expense",
    value: TRANSACTION_CATEGORY.billExpense,
  },
  {
    label: "Others",
    value: TRANSACTION_CATEGORY.others,
  },
];

export const TRANSACTION_CATEGORY_FORMAT = {
  [TRANSACTION_CATEGORY.entertainment]: "Entertainment",
  [TRANSACTION_CATEGORY.investment]: "Investment",
  [TRANSACTION_CATEGORY.billExpense]: "Bill Expense",
  [TRANSACTION_CATEGORY.others]: "Others",
};

export const RADIAN = Math.PI / 180;