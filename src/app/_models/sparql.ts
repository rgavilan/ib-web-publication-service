
export class SparqlResults {
    head: {
        vars: string[];
    };
    boolean?: boolean;
    results?: {
        bindings: Binding[];
    };
}

export class Binding {
    [varname: string]: BindingValue;
}


export class BindingValue {
    value: string;
    type: 'uri' | 'literal' | 'typed-literal' | 'bnode';
    datatype?: string;
    'xml:lang'?: string;
}
