import { Box, Skeleton } from "@mui/material";

export default function LoaderSkeleton() {
    return <Box width={'100%'}>
        <Skeleton height={64} className="m-2 box-content" />
        <Skeleton height={64} className="m-2 box-content" animation="wave" />
        <Skeleton height={64} className="m-2 box-content" animation={false} />
        <Skeleton height={64} className="m-2 box-content" animation={false} />
        <Skeleton height={64} className="m-2 box-content" animation={false} />
    </Box>
}