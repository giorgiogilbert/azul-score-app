import type {UiComposable} from "~/types/ui";

export const useUi = (window: Window): UiComposable => {

    const { t } = useI18n()

    const showFlashMessage = (message: string) => {
        const alertNode = window.document.querySelector('#alert');
        if(alertNode) {
            alertNode.innerHTML = message
            alertNode.classList.add('animatedAlert');
            setTimeout(() => {
                alertNode.classList.remove('animatedAlert');
            }, 3000)
        }
    }
    const animateActiveText = (cssSelector: string ) => {
        const node = window.document.querySelector(cssSelector)
        node?.classList.add('animatedActiveText');
        if(node) {
            setTimeout(() => {
                node.classList.remove('animatedActiveText');
            }, 2000)
        }
    }

    const newGameStarted = () => {
        showFlashMessage(t('newGameStarted'));
    }
    const transitionToNextTurn = (turnScore: number) => {
        const msg = turnScore > 0 ? '+'+turnScore : turnScore.toString()
        showFlashMessage(msg);
        animateActiveText('.totalScore');
    }

    return {
        newGameStarted,
        transitionToNextTurn
    }
}
