import React, { useState, useEffect, useRef } from 'react';

const CustomInput = ({ placeholder, value, onChange }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [dropdownOptions] = useState([
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 5' },
        { value: 'option2', label: 'Option 5' },
        { value: 'option2', label: 'Option 5' },
        { value: 'option2', label: 'Option 5' },
        { value: 'option2', label: 'Option 5' },
        { value: 'Capslock', label: 'Capslock' },
    ]);
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
                        background: '#fff',
                        border: '1px solid #ccc',
                    }}
                >
                    {dropdownOptions.map((option) => (
                        <div
                            key={option.value}
                            onClick={() => handleOptionSelect(option)}
                            style={{ padding: '5px', cursor: 'pointer' }}
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
