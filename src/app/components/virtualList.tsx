'use client'
import { useCallback, useEffect, useRef, useState } from "react";
import styles from '../../styles/virtualList.module.css';

interface IVirtualizedListProps {
  data: string[];
  selectedItems: string[];
  setSelectedItems: (items: string[]) => void;
  itemHeight: number;
  buffer: number;
  multi: boolean;
  selectAll: boolean;
  toggleSelectAll: () => void;
  isMulti: boolean;
}

const VirtualizedList: React.FC<IVirtualizedListProps> = (props: IVirtualizedListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data, selectedItems, setSelectedItems, itemHeight, buffer, multi, selectAll, toggleSelectAll,isMulti } = props;

  const itemCount = data.length;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(20); // Initially render enough items to fill the viewport
  const visibleItemCount = Math.ceil(window.innerHeight / itemHeight);

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      const newStartIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer);
      const newEndIndex = Math.min(
        itemCount - 1,
        Math.floor((scrollTop + window.innerHeight) / itemHeight) + buffer
      );
      setStartIndex(newStartIndex);
      setEndIndex(newEndIndex);
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll]);

  const visibleItems = data.slice(startIndex, endIndex + 1);

  const paddingTop = startIndex * itemHeight;
  const paddingBottom = (itemCount - endIndex - 1) * itemHeight;

  const handleItemSelect = (item: string, idx: number) => {
    const selected = item;
    if (multi) {
      const newSelectedItems = selectedItems?.includes(selected)
      ? selectedItems?.filter(i => i !== selected)
      : [...selectedItems ?? [], selected];
      setSelectedItems(newSelectedItems);
    } else {
      setSelectedItems([selected]);
    }
  }

  return (
    <div className={styles.container} ref={containerRef}>
      <div style={{ paddingTop, paddingBottom }}>
        {data.length > 0 ?
          <div
            className={styles.listItem}
            style={{backgroundColor: selectAll ? 'blue' : ''}}
          >
            <input type={"checkbox"} checked={selectAll} className={styles.selectCheck} disabled={!isMulti ?? true}             onClick={() => toggleSelectAll()}
/>
            <div>Select All</div>
          </div>
          : <div
          className={styles.listItem}
        >
          No records found
        </div>

        }

        {visibleItems.map((item, index) => (
          <div
            key={startIndex + index}
            className={styles.listItem}
            onClick={() => handleItemSelect(item, index)}
            style={{backgroundColor: selectedItems.includes(item) ? '#121212' : ''}}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualizedList;