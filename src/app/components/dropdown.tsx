'use client'
import React, { useEffect, useState } from 'react'
import styles from "../../styles/dropdown.module.css";
import VirtualizedList from "./virtualList";

interface IDropdownProps {
  data: any[];
  textField: string;
  // disabled: boolean;
  // label: string;
  // onChange?: () => void;
  // onFilterChange?: () => void;
  opened?: boolean;
  // selectedValue?: any;
  multi?: boolean;
}

const Dropdown = (props: IDropdownProps) => {
  const [open, setOpen] = useState<boolean | undefined>(props.opened);
  const [listData, setListData] = useState<string[]>(props.data.map(x => x[props.textField]));
  const [filteredListData, setFilteredListData] = useState<string[]>(listData);
  const [selectedItems, setSelectedItems] = useState<string[]>();
  const [selectAll, setSelectAll] = useState<boolean>(false);

  //#region user interactions
  useEffect(() => {
    if (selectAll) {
      setSelectedItems(listData);
    } else {
      setSelectedItems([]);
    }
  }, [listData, selectAll])

  const handleOpenClose = () => {
    setOpen(!open);
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filterValue = e.target.value;
    const tempList = listData.filter(item => item.toString().toLowerCase().includes(filterValue.toLowerCase()));
    setFilteredListData(tempList);
  }

  //#endregion

  return (
    <div className={styles.container}>
      <div className={open ? styles.selectedOpen : styles.selected}>
        <div className={styles.selectedInner} onClick={handleOpenClose}>{selectedItems?.join(', ')}</div>
        <div className={open ? styles.upArrow : styles.downArrow}/>
      </div>
      <div className={styles.menu} style={{display: open ? 'block' : 'none'}} >
        <div className={styles.searchWrapper}>
          <div className={styles.innerWrapper}>
            <input className={styles.searchInput} onChange={handleFilterChange} placeholder="Start typing to filter usernames..."/>
          </div>
        </div>
        <VirtualizedList
          data={filteredListData}
          selectedItems={selectedItems ?? []}
          setSelectedItems={setSelectedItems}
          itemHeight={16}
          buffer={5}
          multi={props.multi ?? true}
          selectAll={selectAll}
          toggleSelectAll={() => setSelectAll(!selectAll)}
          isMulti={props.multi ?? false}
        />
      </div>
    </div>
  )
}

export default Dropdown;