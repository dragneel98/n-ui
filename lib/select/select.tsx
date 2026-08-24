import { useState } from 'react';
import styles from './select.module.css';
import { IoIosArrowDown } from "react-icons/io";

// Define the types for the props
interface SelectProps {
    options: string[];
    onSelect?: (option: string) => void;
    title: string;
    children?: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({ options, onSelect, title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        if (onSelect) {
            onSelect(option);
        }
        setIsOpen(false);
    };

    return (
        <div className={styles.customSelect}>
            <div
                className={styles.selectedOption}
                onClick={() => setIsOpen(!isOpen)}
            >
                <p className={styles.selectedOptionP}>{selectedOption || title}</p>
                {children}
                <div className={`${styles.arrowIcon} ${isOpen ? styles.rotate : ''}`}>
                    <IoIosArrowDown />
                </div>
            </div>
            <ul
                className={`${styles.optionsList} ${isOpen ? styles.open : styles.closed}`}
                aria-hidden={!isOpen}
            >
                {options.map((option, index) => (
                    <li
                        key={index}
                        className={styles.option}
                        onClick={() => handleOptionClick(option)}
                    >
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    );
};
