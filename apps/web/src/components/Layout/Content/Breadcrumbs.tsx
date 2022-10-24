import { capitalize } from "@/utils/strings";
import { Breadcrumb } from "@romalms/design-system";
import { useRouter } from "next/router";
import { useMemo } from "react";

export const Breadcrumbs = () => {
  const router = useRouter();

  const breadcrumbsList = useMemo(
    function generateBreadcrumbs() {
      const asPathWithoutQuery = router.asPath.split("?")[0];
      const asPathNestedRoutes = asPathWithoutQuery
        .split("/")
        .filter((v) => v.length > 0);

      const crumblist = asPathNestedRoutes.map((subpath, idx) => {
        const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
        return { href, text: subpath };
      });

      return [{ href: "/", text: "Home" }, ...crumblist];
    },
    [router.asPath]
  );

  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      {breadcrumbsList.map((crumb, index) => (
        <Breadcrumb.Item
          key={index}
          href={index === breadcrumbsList.length - 1 ? undefined : crumb.href}
          onClick={(e) => {
            e.preventDefault();
            if (index !== breadcrumbsList.length - 1) router.push(crumb.href);
          }}
        >
          {capitalize(crumb.text)}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};
