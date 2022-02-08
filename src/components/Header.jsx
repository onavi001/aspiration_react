import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { FaGithub } from 'react-icons/fa';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import '../style/Header.css';
const CssTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        height: "32px",
        '& input': {
            color: '#FFFFFF',
            
        },
        '& fieldset': {
            borderColor: '#57606a',
            color: '#57606a',
        },
        '&:hover fieldset': {
            borderColor: '#57606a',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#57606a',
        },
    },
});
const Header = () => {
    let navigate = useNavigate();
    const [search,setSearch]=useState("");
    const [showAlert,setShowAlert]=useState(false);
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            validateSearch();
        }
    }
    const validateSearch = () => {
        if(search === ""){
            setShowAlert(true);
        }else{
            setShowAlert(false);
            navigate(`/${search}`);
            setSearch("")
        }
    }
    return (
        <>
        <nav>
            <div>
                <FaGithub size={32} color='#FFFFFF' className='GitHubIcon'/>
                <label className='TitleApp' >GitHub Topic Explorer by Ivan</label>
            </div>
            <div>
                <CssTextField
                    onKeyDown={handleKeyDown}
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    className='input-search'
                    sx={{ m: 1, width: '35ch',color:"#57606a" }}
                    size="small"
                    placeholder='Search...'
                    inputProps={{
                        "data-testid":"input-search"
                    }}
                />
                <Button onClick={validateSearch} data-testid="button-search" variant="contained" className='buttonSearch' >Search</Button>
            </div>
        </nav> 
        {
            showAlert ? 
                <Alert data-testid="alerta" variant="filled" severity="error">Field search is not valid</Alert>
            :
                null
        }
        </>
    );
}
 
export default Header;