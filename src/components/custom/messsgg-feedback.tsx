import { useTranslation } from "react-i18next";

type MessageFeedbackProps = {
  messageKey?: string;
};
export default function MessageFeedback({ messageKey }: MessageFeedbackProps) {
  const { t } = useTranslation();

  const messgas: { [key: string]: string } = {
    "register-first-name-required": t("first-name-requried"),
    "register-firstName-min": t("first-name-min"),
    "register-firstName-max": t("first-name-max"),
    "register-last-name-required": t("last-name-required"),
    "register-lastName-min": t("last-name-min"),
    "register-lastName-max": t("last-name-max"),
    "register-email-required": t("email-required"),
    "register-email-valid": t("email-valid"),
    "register-password-required": t("password-required"),
    "register-password-min": t("password-min"),
    "register-password-weak": t("password-regex"),
    "register-rePassword-required": t("password-consformation-required"),
    "register-passwords-not-match": t("password-and-password-not-match"),
    "register-gender-required": t("selcte-a-gender"),
    "register-age-required": t("age-required"),
    "register-age-min": t("min-age"),
    "register-age-max": t("max-age"),
    "register-height-required": t("height-required"),
    "register-height-min": t("minmium-hieght"),
    "register-height-max": t("maxmium-hieght"),
    "register-weight-required": t("weight-required"),
    "register-weight-min": t("minmium-weight"),
    "register-weight-max": t("maxmium-weight"),
    "register-gaol-required": t("selecte-a-goal"),
    "rgister-activity-level-required": t("selecte-a-level"),
    "register-password-not-match": t("password-and-password-conformation"),
  };

  if (!messageKey) return null;

  return <p className=" text-red-500 text-center text-sm font-medium">{messgas[messageKey]}</p>;
}
