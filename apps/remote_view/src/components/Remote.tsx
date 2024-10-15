import PokeView from './PokeView/PokeView';
import '../index.css';

const Remote = () => {
  return (
    <div
      className="flex items-center justify-center 
        border-8 border-dashed border-green-600 rounded-xl text-3xl"
      style={{
        padding: 10,
        margin: 20,
        minWidth: 870,
        minHeight: 310,
      }}
    >
      <PokeView />
    </div>
  );
};

export default Remote;
