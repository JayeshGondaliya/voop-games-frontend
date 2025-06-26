
import { useParams } from "react-router-dom";
import DetailsPage from "./DetailsPage";

const DetailsPageWrapper = () => {
    const { code } = useParams();
    return <DetailsPage key={code} />;
};

export default DetailsPageWrapper;
