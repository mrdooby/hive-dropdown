import Image from "next/image";
import styles from "./page.module.css";
import Dropdown from "./dropdown";

export default function Home() {
  return (
    <div>
      <h1>Hive Frontend Engineer Challenge</h1>
      <Dropdown/>
    </div>
  );
}
