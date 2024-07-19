enum ExcludingModelType {
    Config,
    UI,
}

type ExcludingModel = {
    type: ExcludingModelType;
    excludedModelName: string;
}

export const modelExclusionArray: ExcludingModel[] = [
    {
        type: ExcludingModelType.Config,
        excludedModelName: 'Account',
    },
    {
        type: ExcludingModelType.Config,
        excludedModelName: 'Session',
    },
    {
        type: ExcludingModelType.Config,
        excludedModelName: 'VerificationToken',
    },
    {
        type: ExcludingModelType.Config,
        excludedModelName: 'User',

    },

];