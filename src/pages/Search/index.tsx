import React, {useEffect, useState} from "react";
import { useDebounce } from "@uidotdev/usehooks";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import api from "../../api_client";

const Search = () => {
    const {searchValue} = useSelector((state: RootState) => state.PersonalCollectionsStore);

    const [data, setData] = useState<any>(null);
    const debouncedSearchTerm = useDebounce(searchValue, 3000);

    useEffect(()=>{
        (
            async () => {
                if(debouncedSearchTerm){
                    const response = await api.getSearchResult(searchValue);
                    if(response.status === 200){
                        console.log(response.data);
                        setData(response.data);
                    }

                }
            }
        )()
    }, [debouncedSearchTerm])

    return (
        <div>
            search
        </div>
    )
}

export default Search;