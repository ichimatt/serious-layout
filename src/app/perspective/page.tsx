import type { Metadata } from "next";
import PerspectiveThumb from "../_components/PerspectiveThumb/PerspectiveThumb";

export const metadata: Metadata = {
  title: "Perspective",
};

export default function PerspectivePage() {
  return (
    <section
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <PerspectiveThumb />
    </section>
  );
}
