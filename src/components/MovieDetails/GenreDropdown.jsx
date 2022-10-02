import { useSelector, useDispatch } from "react-redux";
import { InputLabel, FormControl, Select, MenuItem, FormHelperText } from "@mui/material";


export default function GenreDropdown() {
    const dispatch = useDispatch();
    const genresArray = useSelector(store => store.genres);

    const handleGenreChange = (event) => {
        // Trigger Saga PUT request to update favorites table
        dispatch({
            type: 'SAGA_SET_GENRE',
            payload: {
            }
        });

        // Also use local state to force item reload
        // setCurrentCat(event.target.)
    }

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Genres</InputLabel>
            <Select
                value={''}
                onChange={handleGenreChange}
            >
                <MenuItem value={genresArray[0]?.id}>{genresArray[0]?.name}</MenuItem>
                <MenuItem value={genresArray[1]?.id}>{genresArray[1]?.name}</MenuItem>
                <MenuItem value={genresArray[2]?.id}>{genresArray[2]?.name}</MenuItem>
                <MenuItem value={genresArray[3]?.id}>{genresArray[3]?.name}</MenuItem>
                <MenuItem value={genresArray[4]?.id}>{genresArray[4]?.name}</MenuItem>
            </Select>
            <FormHelperText>Click to change Genre</FormHelperText>
        </FormControl>
    )
}