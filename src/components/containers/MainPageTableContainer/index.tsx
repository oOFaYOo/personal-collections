import {Link} from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Table from "../../Table";
import React from "react";
import {IMainPageTableContainer} from "./type";

const MainPageTableContainer = ({data, config, className, url, onRowClick}:IMainPageTableContainer) => {
    return (
        <section className={`${className} w-full mobile:flex-col flex flex-row-reverse`}>
            <Link to={url}
                  className={'max-w-[50px] min-w-[50px] mobile:min-w-full flex justify-end lg:justify-center ' +
                      'items-center opacity-30 hover:opacity-100'}>
                <ArrowForwardIosIcon color={'inherit'} fontSize={"large"}/>
            </Link>
            <Table data={data} config={config} onRowClick={
                (e,id, row)=>onRowClick(e,id, row!)}/>
        </section>
    )
}

export default MainPageTableContainer;