import Data from '../components/data';
import Filter from '../components/treanaction-filter';
import '../pages-styles/transactions.css';


const Members = () => {
    return ( 

        <div className="transactions">
            <Filter/>
        <Data />
        </div>
     );
}
 
export default Members;