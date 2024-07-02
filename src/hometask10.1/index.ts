type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

type DeepRequiredReadonly<T> = {
    readonly [P in keyof T]-?: T[P] extends object ? DeepRequiredReadonly<T[P]> : T[P];
};

type UpperCaseKeys<T> = {
    [P in keyof T as Uppercase<string & P>]: T[P];
};

type ObjectToPropertyDescriptor<T> = {
    [K in keyof T]: PropertyDescriptor;
};
