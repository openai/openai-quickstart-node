import React, { useState } from 'react';

const CustomInput = ({ placeholder, value, onChange }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [dropdownOptions] = useState([
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' }
    ]);

    const handleInputChange = (e) => {
        onChange(e.target.value);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        onChange(option.label);
        setDropdownOpen(false);
    };

    return (
        <div style={{ position: 'relative', width: '318px' }}>
            <input
                style={{ width: '285px' }}
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={handleInputChange}
                onClick={toggleDropdown}
            />
            {dropdownOpen && (
                <div style={{ position: 'absolute', top: '100%', left: '0', width: '100%' }}>
                    <div style={{ background: '#fff', border: '1px solid #ccc', marginTop: '1px' }}>
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
                </div>
            )}
        </div>
    );
};

export default CustomInput;
