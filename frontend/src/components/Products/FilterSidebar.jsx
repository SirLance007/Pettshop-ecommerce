import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FaDog, FaCat, FaHeart, FaShoppingBag, FaBone, FaTshirt, FaTag, FaPalette, FaCrown, FaStore, FaChevronDown } from 'react-icons/fa';
import { GiHummingbird, GiRabbit, GiDogBowl, GiCat, GiBirdHouse, GiDogHouse } from 'react-icons/gi';
import { MdPets, MdToys, MdCleaningServices } from 'react-icons/md';
import { BiReset } from 'react-icons/bi';
import { RiPriceTag3Line } from 'react-icons/ri';
import { SiPetsathome } from 'react-icons/si';

// Add a new FilterSection component for collapsible sections
const FilterSection = ({ title, icon, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    
    return (
        <div className="mb-6 transform transition-all duration-300 hover:translate-x-1">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between text-lg font-semibold text-pet-brown mb-3 hover:bg-pet-brown/5 p-2 rounded-lg transition-colors duration-200"
            >
                <div className="flex items-center gap-2">
                    {icon}
                    {title}
                </div>
                <FaChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                {children}
            </div>
        </div>
    );
};

const FilterSideBar = ({ isMobile, onClose }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const [filters, setFilters] = useState({
        category: "",
        price: "",
        rating: "",
        color: [],
        size: [],
        material: [],
        brand: [],
        minPrice: 0,
        maxPrice: 1000,
        petType: "",
    });

    const [priceRange, setPriceRange] = useState([0, 1000]);

    const categories = ["Clothing", "Accessories", "Food", "Toys", "Grooming"];
    const brands = ["PawStyle", "PetCo", "Royal Canin", "Zanzmer", "PawIndia"];
    const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
    const colors = ["Red", "Blue", "Green", "Black", "White", "Yellow", "Pink", "Purple", "Orange"];
    const materials = ["Cotton", "Polyester", "Nylon", "Wool", "Leather"];
    const petTypes = ["Dogs", "Cats", "Birds", "Small Pets"];

    const categoryIcons = {
        "Clothing": <FaTshirt />,
        "Accessories": <FaShoppingBag />,
        "Food": <GiDogBowl />,
        "Toys": <MdToys />,
        "Grooming": <MdCleaningServices />
    };

    // Brand icons mapping
    const brandIcons = {
        "PawStyle": <GiDogHouse className="w-5 h-5" />,
        "PetCo": <FaStore className="w-5 h-5" />,
        "Royal Canin": <FaCrown className="w-5 h-5" />,
        "Zanzmer": <SiPetsathome className="w-5 h-5" />,
        "PawIndia": <MdPets className="w-5 h-5" />
    };

    // Brand colors mapping
    const brandColors = {
        "PawStyle": "from-blue-500 to-purple-500",
        "PetCo": "from-green-500 to-teal-500",
        "Royal Canin": "from-yellow-500 to-orange-500",
        "Zanzmer": "from-pink-500 to-rose-500",
        "PawIndia": "from-indigo-500 to-blue-500"
    };

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        setFilters({
            category: params.category || "",
            price: params.price || "",
            rating: params.rating || "",
            color: params.color ? params.color.split(",") : [],
            size: params.size ? params.size.split(",") : [],
            material: params.material ? params.material.split(",") : [],
            brand: params.brand ? params.brand.split(",") : [],
            minPrice: params.minPrice || 0,
            maxPrice: params.maxPrice || 1000,
            petType: params.petType || "",
        });
        setPriceRange([+params.minPrice || 0, +params.maxPrice || 1000]);
    }, [searchParams]);

    const handleFilterChange = (e) => {
        const { name, value, checked, type } = e.target;
        let newFilters = { ...filters };

        if (type === "checkbox") {
            if (checked) {
                newFilters[name] = [...newFilters[name], value];
            } else {
                newFilters[name] = newFilters[name].filter((item) => item !== value);
            }
        } else if (type === "radio") {
            newFilters[name] = value;
        }

        setFilters(newFilters);
        updateURLParams(newFilters);
    };

    const handlePriceChange = (value) => {
        setPriceRange(value);
        const newFilters = {
            ...filters,
            minPrice: value[0],
            maxPrice: value[1]
        };
        setFilters(newFilters);
        updateURLParams(newFilters);
    };

    const updateURLParams = (newFilters) => {
        const params = new URLSearchParams();
        Object.keys(newFilters).forEach((key) => {
            if (Array.isArray(newFilters[key])) {
                if (newFilters[key].length > 0) {
                    params.set(key, newFilters[key].join(","));
                }
            } else if (newFilters[key]) {
                params.set(key, newFilters[key]);
            }
        });
        setSearchParams(params);
        navigate(`?${params.toString()}`);
    };

    const clearAllFilters = () => {
        setFilters({
            category: "",
            price: "",
            rating: "",
            color: [],
            size: [],
            material: [],
            brand: [],
            minPrice: 0,
            maxPrice: 1000,
            petType: "",
        });
        setPriceRange([0, 1000]);
        setSearchParams(new URLSearchParams());
    };

    // Add new toggle switch component
    const ToggleSwitch = ({ isChecked, onChange, label }) => (
        <label className="flex items-center cursor-pointer group">
            <div className="relative">
                <input
                    type="checkbox"
                    className="hidden"
                    checked={isChecked}
                    onChange={onChange}
                />
                <div className={`w-10 h-5 rounded-full shadow-inner transition-colors duration-300 ease-in-out ${
                    isChecked ? 'bg-pet-brown' : 'bg-gray-300'
                }`}>
                    <div className={`absolute w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                        isChecked ? 'translate-x-6 bg-white' : 'translate-x-1 bg-white'
                    }`} />
                </div>
            </div>
            <span className="ml-3 text-gray-700 group-hover:text-pet-brown transition-colors duration-200">
                {label}
            </span>
        </label>
    );

    return (
        <aside className={`bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 animate-fade-in transition-all duration-300 hover:shadow-2xl ${
            isMobile ? 'p-4' : 'p-6 sticky top-24'
        }`}>
            {/* Header with bounce animation */}
            <div className="flex items-center justify-between mb-6 group">
                <h3 className="text-2xl font-bold text-pet-brown flex items-center gap-2 transition-transform duration-300 group-hover:scale-105">
                    <MdPets className="w-6 h-6 text-pet-brown animate-bounce" />
                    <span className="bg-gradient-to-r from-pet-brown to-pet-brown/70 bg-clip-text text-transparent">
                        Filters
                    </span>
                </h3>
                <button
                    onClick={clearAllFilters}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm text-pet-brown hover:bg-pet-brown/10 font-medium transition-all duration-200 group"
                >
                    <BiReset className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                    Clear All
                </button>
            </div>

            {/* Pet Type Filter */}
            <FilterSection title="Pet Type" icon={<FaBone className="w-5 h-5 animate-pulse" />} defaultOpen={true}>
                <div className="grid grid-cols-2 gap-2">
                    {petTypes.map((pet) => (
                        <label
                            key={pet}
                            className={`flex items-center gap-2 p-3 rounded-xl cursor-pointer transition-all duration-300
                                ${filters.petType === pet 
                                    ? 'bg-pet-brown text-white shadow-lg scale-105 hover:bg-pet-brown/90' 
                                    : 'bg-white/50 text-pet-brown hover:bg-pet-brown/10 hover:scale-105'}`}
                        >
                            <input
                                type="radio"
                                name="petType"
                                value={pet}
                                checked={filters.petType === pet}
                                onChange={handleFilterChange}
                                className="hidden"
                            />
                            {pet === "Dogs" && <FaDog className="w-5 h-5" />}
                            {pet === "Cats" && <GiCat className="w-5 h-5" />}
                            {pet === "Birds" && <GiBirdHouse className="w-5 h-5" />}
                            {pet === "Small Pets" && <GiRabbit className="w-5 h-5" />}
                            <span className="font-medium">{pet}</span>
                        </label>
                    ))}
                </div>
            </FilterSection>

            {/* Category Filter */}
            <FilterSection title="Category" icon={<FaTag className="w-5 h-5 animate-pulse" />}>
                <div className="space-y-2">
                    {categories.map((category) => (
                        <label
                            key={category}
                            className="flex items-center gap-2 cursor-pointer group p-2 rounded-lg hover:bg-pet-brown/5 transition-all duration-200"
                        >
                            <input
                                type="radio"
                                name="category"
                                value={category}
                                checked={filters.category === category}
                                onChange={handleFilterChange}
                                className="w-4 h-4 text-pet-brown border-2 border-pet-brown/30 focus:ring-pet-brown rounded-full transition-all duration-200"
                            />
                            <span className="text-gray-700 group-hover:text-pet-brown transition-colors duration-200 flex items-center gap-2">
                                <span className="text-pet-brown/70 group-hover:scale-110 transition-transform duration-200">
                                    {categoryIcons[category]}
                                </span>
                                {category}
                            </span>
                        </label>
                    ))}
                </div>
            </FilterSection>

            {/* Price Range Filter */}
            <FilterSection title="Price Range" icon={<RiPriceTag3Line className="w-5 h-5 animate-pulse" />}>
                <div className="px-2">
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-600 font-medium">${priceRange[0]}</span>
                        <span className="text-gray-600 font-medium">${priceRange[1]}</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full h-2 bg-gradient-to-r from-pet-brown/20 to-pet-brown rounded-lg appearance-none cursor-pointer hover:shadow-lg transition-shadow duration-200"
                    />
                </div>
            </FilterSection>

            {/* Brand Filter */}
            <FilterSection title="Popular Brands" icon={<FaTag className="w-5 h-5 animate-pulse" />}>
                <div className="grid grid-cols-2 gap-2">
                    {brands.map((brand) => (
                        <button
                            key={brand}
                            onClick={() => {
                                const newFilters = { ...filters };
                                if (newFilters.brand.includes(brand)) {
                                    newFilters.brand = newFilters.brand.filter(b => b !== brand);
                                } else {
                                    newFilters.brand = [...newFilters.brand, brand];
                                }
                                setFilters(newFilters);
                                updateURLParams(newFilters);
                            }}
                            className={`group relative p-3 rounded-xl transition-all duration-300 hover:scale-105 overflow-hidden
                                ${filters.brand.includes(brand)
                                    ? 'bg-gradient-to-r shadow-lg text-white transform scale-105'
                                    : 'bg-white/50 text-pet-brown hover:bg-pet-brown/5 border border-gray-200'} 
                                ${filters.brand.includes(brand) ? brandColors[brand] : ''}`}
                        >
                            <div className="relative z-10 flex flex-col items-center gap-2">
                                <span className={`transition-transform duration-300 transform
                                    ${filters.brand.includes(brand) 
                                        ? 'scale-110 text-white'
                                        : 'text-pet-brown group-hover:scale-110'}`}>
                                    {brandIcons[brand]}
                                </span>
                                <span className="font-medium text-sm text-center">
                                    {brand}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </FilterSection>

            {/* Other filter sections... */}
            {isMobile && (
                <button
                    onClick={onClose}
                    className="w-full mt-6 bg-pet-brown text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-pet-brown/90 transition-colors duration-200"
                >
                    Apply Filters
                </button>
            )}
        </aside>
    );
};

export default FilterSideBar;


