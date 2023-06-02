import React, { useState, useEffect, useRef } from 'react';
import DropdownOptions from '../resources/DropdownOptions.js';

const CustomInput = ({ placeholder, value, onChange }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const [dropdownOptions] = useState(DropdownOptions);

    const [filteredOptions, setFilteredOptions] = useState([]);
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                inputRef.current &&
                !inputRef.current.contains(event.target) &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (value) {
            const filtered = dropdownOptions.filter((option) =>
                option.label.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredOptions(filtered);
        } else {
            setFilteredOptions(dropdownOptions);
        }
    }, [value]);

    const handleInputChange = (e) => {
        onChange(e.target.value);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        onChange(option.value);
        setDropdownOpen(false);
    };

    return (
        <div style={{ position: 'relative', width: '319px', marginBottom: '24px' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                    ref={inputRef}
                    style={{ width: '285px', paddingRight: '30px' }}
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={handleInputChange}
                    onClick={toggleDropdown}
                />
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        right: '10px',
                        transform: 'translateY(-50%)',
                        pointerEvents: 'none',
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"

                    >
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </div>
            </div>
            {dropdownOpen && (
                <div
                    ref={dropdownRef}
                    style={{
                        position: 'absolute',
                        left: '0',
                        width: '317px',
                        maxHeight: '200px',
                        background: '#fff',
                        border: '1px solid #ccc',
                        overflowY: 'auto',
                        zIndex: '9999',
                        borderRadius: '4px',
                        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                        // padding: '5px',
                    }}
                >
                    {filteredOptions.map((option, index) => (
                        <div
                            key={option.value}
                            onClick={() => handleOptionSelect(option)}
                            style={{
                                padding: '8px 12px',
                                cursor: 'pointer',
                                borderBottom: index === filteredOptions.length - 1 ? 'none' : '1px solid #ccc',
                            }}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomInput;
