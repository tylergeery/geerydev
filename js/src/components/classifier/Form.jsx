import FormComponent from '../common/FormComponent';

class FormClassifier extends FormComponent {
    render() {
        return (
            <div>
                <h1>GeeryDev vs ThrowingItBackWeekly</h1>
                <p>
                    Type a query into the search box below and confirm your suspicions about the vocabulary
                    used on geerydev.com and throwingitbackweekly.com. Try being more specific, more vague, more slang,
                    more formal, more sporty. See what you can find.
                </p>
                <form>
                    <label>Query:
                        <input name='query' defaultValue='' placeholder='Search who said it' />
                    </label>
                </form>
            </div>
        );
    }
}

export default FormClassifier;
