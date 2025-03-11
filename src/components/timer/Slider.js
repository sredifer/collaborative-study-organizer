import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

const Slider = ({ value, onChange }) => {
    return (
        <RangeSlider
          className="single-thumb"
          min={0}
          max={120}
          value={[0, value]}  
          onInput={(newValue) => onChange(newValue[1])}  
          thumbsDisabled={[true, false]}
          rangeSlideDisabled={true}
        />
    );
}

export default Slider;