import { InputBox } from './styles';

interface Props {
  readonly placeholder?: string;
  readonly onChange?: (text: string) => void;
  readonly value?: string;
}

const Input: React.FC<Props> = ({ placeholder, onChange, value }) => {
  return (
    <InputBox
      value={value}
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
