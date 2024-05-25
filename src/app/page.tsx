'use client'
import Image from "next/image";
import styles from "../styles/page.module.css";
import Dropdown from "./components/dropdown";
import {users} from "../data/mock";
import { useState } from "react";

export default function Home() {
  const [isMulti, setIsMulti] = useState<boolean>(false);
  return (
    <div>
      <h1>Hive Frontend Engineer Challenge</h1>
      <div style={{display: 'flex'}}>
        <div style={{marginRight: '1rem'}}>Is Multi?</div>
        <input type={'checkbox'} checked={isMulti} onChange={() => setIsMulti(!isMulti)}/>
      </div>
      <Dropdown
        data={users}
        textField="username"
        multi={isMulti}
      />
    </div>
  );
}
