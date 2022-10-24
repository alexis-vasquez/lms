import { FallbackSpinner } from "@/components/FallbackSpinner";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "../../../pages/_app";

export function protectedPage<P = {}, IP = P>(
  Component: NextPageWithLayout<P, IP>
) {
  const AnyComponent = Component as any;

  const Page: NextPageWithLayout<P, IP> = (props: P) => {
    const { user } = useAuthContext();
    const router = useRouter();

    if (user) {
      router.push("/");
      return <FallbackSpinner />;
    }

    return <AnyComponent {...props} />;
  };

  if (Component.getInitialProps) {
    Page.getInitialProps = Component.getInitialProps;
  }

  if (Component.layout) {
    Page.layout = Component.layout;
  }

  return Page;
}
