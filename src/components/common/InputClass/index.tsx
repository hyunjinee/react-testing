import { Component } from 'react';
import { InputBox } from './styles';

interface Props {
  readonly placeholder?: string;
  readonly onChange?: (text: string) => void;
  readonly value?: string;
}

export class Input extends Component<Props> {
  render() {
    const { placeholder, value, onChange } = this.props;

    return (
      <InputBox
        placeholder={placeholder}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (onChange) {
            onChange(e.target.value);
          }
        }}
      />
    );
  }
}
