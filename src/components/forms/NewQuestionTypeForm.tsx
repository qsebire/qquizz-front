import Input from './elements/Input';

export default function NewQuestionTypeForm() {
    return (
        <form>
            <Input
                label='Nom du type de question'
                name='name'
            />
        </form>
    );
}

// name: z.string().min(1, { message: 'Le nom est requis.' }),
// description: z.string().min(1, { message: 'La description est requise.' }),
// gameModes: z
//     .array(gameModesEnum)
//     .nonempty({ message: 'Au moins un gameMode est requis.' }),
// answerModes: z
//     .array(answerModesEnum)
//     .nonempty({ message: 'Au moins un answerMode est requis.' }),
// requiresImage: z.boolean(),
// requiresTheme: z.boolean(),
// defaultPrompt: z.string().optional(),
