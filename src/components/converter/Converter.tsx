import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { toastStore } from "../../stores/toast"

type CurrentRateType = {
    base: string
    date: string
    motd: {
        msg: string
        url: string
    },
    rates: Record<string, number>,
    success: true
}

const API_URL = 'https://api.exchangerate.host/latest' as const
const params = new URLSearchParams({
    base: "RUB"
})
const URL = API_URL + `?${params.toString()}`

export const ExchangeRateConverter = () => {
    const [coefficient, setCoefficient] = useState(45)
    const [base, setBase] = useState("USD")
    const [inputValue, setInputValue] = useState(1)
    const [result, setResult] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [apiData, setApiData] = useState<CurrentRateType | null>(null)

    function loadDataFromAPI() {
        setIsLoading(true)
        fetch(URL)
        .then(data => data.json())
        .then(data => {
            setApiData(data)
            setCoefficient(data.rates[base])
        })
        .catch(error => {
            if(error instanceof Error) {
                toastStore.createToast({
                    kind: 'alert',
                    description: 'Не удалось загрузить данные из сервера. \n' + error.message,
                    title: "Ошибка сети"
                })
            }
        })
        .finally(() => {
            setIsLoading(false)
        })
    }

    function handleBaseChange(event: ChangeEvent<HTMLSelectElement>) {
        setBase(event.target.value)
        setCoefficient(apiData!.rates[event.target.value])
    }

    useEffect(() => {
        loadDataFromAPI()
    }, [])
    
    useEffect(() => {
        setResult(inputValue / coefficient)
        console.log(result)
    }, [inputValue, base, coefficient])

    function handleInputValueInput(event: FormEvent<HTMLInputElement>) {
        const value = Number(event.currentTarget.value)
        if(!value || isNaN(value)) {
            return;
        }
        setInputValue(value)
    }

    if(isLoading) {
        return(
            <h2>Загрузка...</h2>
        )
    }

    if(!apiData) {
        return (
            <div>
                <h2>Произошла ошибка во время загрузки данных из сервера.</h2>
                <button onClick={loadDataFromAPI}>Попробовать снова</button>
            </div>
        )
    }

    return (
        <section className="converter">
            <h2>Конвертер валют</h2>
            <input onInput={handleInputValueInput} type="number" value={inputValue} />
            <select value={base} onChange={handleBaseChange}>
                {Object.keys(apiData.rates).map(base => {
                    return(
                        <option key={base} value={base}>{base}</option>
                    )
                })}
            </select>
            <div className="result">
            <input readOnly value={result}/> <span>руб.</span>
            </div>
        </section>
    )
}