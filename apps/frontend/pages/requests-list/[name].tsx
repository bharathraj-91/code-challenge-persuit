import { useRouter } from "next/router";
import RequestListView from '../../views/RequestListView';

const RequestListPage = () => {
    const router = useRouter();
    const { name } = router.query;

    const nameString = typeof name === 'string' ? name : '';

    return (
        <div>
            { name && <RequestListView name={nameString}/> }
        </div>
    );
};

export default RequestListPage;
