import { InputBox } from './styles';

interface Props {
  readonly placeholder?: string;
  readonly onChange?: (text: string) => void;
}

const Input: React.FC<Props> = ({ placeholder, onChange }) => {
  return (
    <InputBox
      placeholder={placeholder}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        if (typeof onChange === 'function') {
          onChange(e.target.value);
        }
      }}
    />
  );
};

export default Input;
