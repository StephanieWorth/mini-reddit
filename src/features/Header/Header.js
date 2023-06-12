import React, { useEffect, useState } from 'react';
import './Header.css';
import { FaReddit } from 'react-icons/fa';
import { fetchSearchResults, setSearchTerm,  } from '../Reddit/RedditSlice';
import { useDispatch, useSelector } from 'react-redux';


const Header = () => {

    const dispatch = useDispatch();
    const searchTerm = useSelector(state => state.reddit.searchTerm);
    
    const [searchInput, setSearchInput] = useState('');

    const onHandleChange = (e) => {
        setSearchInput(e.target.value);
    }

    useEffect(() => {
        setSearchInput(searchTerm)
    }, [searchTerm])

    const onHandleSubmit =  (e) => {
        e.preventDefault();
        setSearchInput('');
        dispatch(fetchSearchResults(searchInput));
    }
    

    /*const onHandleSubmit = (e) => {
        document.querySelectorAll('input').value=''
        e.preventDefault();
        dispatch(fetchSearchResults(searchTerm)); 
       
    }

    const onChange = (e) => {
        dispatch(setSearchTerm(e.target.value));
        
    }*/

    return (
        <header>
            <div className="logo">
                <FaReddit className="logo-icon" />
                <p>mini<span>reddit</span></p>
            </div>
            <form onSubmit={onHandleSubmit} className="search" >
                <input
                    type="text"
                    value={searchInput}
                    placeholder="Search minireddit"  
                    onChange={onHandleChange}                  
                    aria-label="search posts"
            /*{(e) => dispatch(setSearchTerm(e.target.value))} */
                />
            </form>
        </header>
    );
};

export default Header;