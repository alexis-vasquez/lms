import { FallbackSpinner } from "@/components/FallbackSpinner";
import { useAuthContext } from "@/context/AuthContext";
import { NextPage } from "next";
import { useRouter } from "next/router";

export function privatePage<P = {}, IP = P>(Component: NextPage<P, IP>){
  const AnyComponent = Component as any;

  const Page = (props: P) => {
    const { user } = useAuthContext();
    const router = useRouter()

    if (!user) {
      router.push("/login");
      return <FallbackSpinner />;
    }

    return <AnyComponent {...props} />;
  };

  if (Component.getInitialProps) {
    Page.getInitialProps = Component.getInitialProps;
  }

  return Page;
}

export function protectedPage<P = {}, IP = P>(Component: NextPage<P, IP>){
  const AnyComponent = Component as any;

  const Page = (props: P) => {
    const { user } = useAuthContext();
    const router = useRouter()

    if (user) {
      router.push("/");
      return <FallbackSpinner />;
    }

    return <AnyComponent {...props} />;
  };

  if (Component.getInitialProps) {
    Page.getInitialProps = Component.getInitialProps;
  }

  return Page;
}