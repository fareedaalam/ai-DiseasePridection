import { Box, Typography } from "@mui/material";

export default function About() {
    return (
        <div className="container py-4 display flex">
            <h1 className="mb-4">Hello, React + TypeScript + Bootstrap</h1>
            <div className="card">
                <div className="card-body">
                    <button className="btn btn-primary me-2">Primary</button>
                    <button className="btn btn-outline-secondary">Secondary</button>
                </div>
            </div>
        </div>
    )

}
