import { Spin } from "@romalms/design-system";

export const FallbackSpinner = () => {
  return (
    <div
      css={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Spin size="large" />
    </div>
  );
};
