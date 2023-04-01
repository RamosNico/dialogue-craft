import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const authCustomStyle = {
  colors: {
    brand: "#0E7490",
    brandAccent: "#0891b2",
    defaultButtonBackground: "#374151",
    defaultButtonBackgroundHover: "#155e75",
    defaultButtonText: "white",
    inputBackground: "#374151",
    inputText: "white",
    inputLabelText: "white",
    inputPlaceholder: "#9ca3af",
    inputBorderFocus: "#06b6d4",
    anchorTextColor: "#9ca3af",
    anchorTextHoverColor: "#fff",
  },
  fonts: {
    bodyFontFamily: `Roboto, sans-serif`,
    buttonFontFamily: `Roboto, sans-serif`,
    inputFontFamily: `Roboto, sans-serif`,
    labelFontFamily: `Roboto, sans-serif`,
  },
  fontSizes: {
    baseBodySize: "14px",
    baseInputSize: "14px",
    baseLabelSize: "16px",
    baseButtonSize: "16px",
  },
  radii: {
    inputBorderRadius: "8px",
    buttonBorderRadius: "8px",
  },
};

export default function SupabaseAuth() {
  const supabase = useSupabaseClient();

  return (
    <div className="container px-12 py-6">
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: authCustomStyle,
          },
        }}
      />
    </div>
  );
}
