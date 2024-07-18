export function getFrontendBaseURL () {
    const host = process.env.NEXT_PUBLIC_FRONTEND_HOST;
    const port = process.env.NEXT_PUBLIC_FRONTEND_PORT;
    return `${host}:${port}`;
};

export function getReadURLFor (model: string, id: number) {
    return `${getFrontendBaseURL()}/admin/${model}/read/${id}`;
};

export function getEditURLFor (model: string, id: number) {
    return `${getFrontendBaseURL()}/admin/${model}/edit/${id}`;
};

export function getCreateURLFor (model: string) {
    return `${getFrontendBaseURL()}/admin/${model}/create`;
};

export function getDeleteURLFor (model: string, id: number) {
    return `${getFrontendBaseURL()}/api/${model}/delete/${id}`;
};

export function getListUrlFor(model: string) {
    return `${getFrontendBaseURL()}/admin/${model}`;
};

export function getModelFromUrl(url: string) {
    const parts = url.split('/');
    return `${parts[parts.length - 2]}/${parts[parts.length - 1]}`;
};
export function getModelFromUrlWithIteration(url: string, iteration: number) {
    const parts = url.split('/');
    if (iteration > parts.length) {
        iteration = parts.length;
    }
    return parts.slice(-iteration).join('/');
};
