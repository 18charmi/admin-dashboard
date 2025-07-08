import { Box, Skeleton } from "@mui/material";

export default function Loading() {
    return <Box width={'80%'} margin={"0 auto"}>
        <Skeleton height={100} />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
    </Box>
}