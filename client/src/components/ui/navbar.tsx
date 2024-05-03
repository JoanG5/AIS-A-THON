import React from "react";
import { Button } from "./button";
import { Link } from "react-router-dom";

type Props = {};

function navbar({}: Props) {
return (
    <div className="w-full h-12 shadow flex justify-center1 items-center">
        <Link to="/hub" className="ml-3 font-bold text-lg">Return To Hub</Link>
    </div>
);
}

export default navbar;
