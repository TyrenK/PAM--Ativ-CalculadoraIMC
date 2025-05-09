import { View, TextInput, Button, StyleSheet } from 'react-native';
import Result from './Result';
import { useState } from 'react';
import ClassIMC from './ClassIMC';
import PesoIdeal from './PesoIdeal';

const FormIMC = () => {
    // Estados para armazenar os dados do formulário e resultados
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [imc, setImc] = useState(null);
    const [classificacao, setClassificacao] = useState('');
    const [pmax, setPmax] = useState('');
    const [pmin, setPmin] = useState('');

    // Função que calcula o IMC, classifica e determina o peso ideal
    const calcularIMC = () => {
        // Verifica se os campos foram preenchidos
        if (!peso || !altura) { return }

        // Converte altura de cm para metros e calcula o IMC
        const alturaMetros = parseFloat(altura) / 100;
        const imcCalculado = (parseFloat(peso) / (alturaMetros * alturaMetros)).toFixed(2);
        setImc(imcCalculado);
    
        // Classificação de acordo com o valor do IMC
        if (imcCalculado < 18.5) {
            setClassificacao('Abaixo do peso');
        } else if (imcCalculado >= 18.5 && imcCalculado <= 24.9) {
            setClassificacao('Peso normal');
        } else if (imcCalculado >= 25 && imcCalculado <= 29.9) {
            setClassificacao('Sobrepeso');
        } else if (imcCalculado >= 30 && imcCalculado <= 34.9)  {
            setClassificacao('Obesidade grau 1');
        } else if (imcCalculado >= 35 && imcCalculado <= 39.9) {
            setClassificacao('Obesidade grau 2');
        } else if (imcCalculado >= 40) {
            setClassificacao('Obesidade grau 3 (obesidade mórbida)');
        }

        // Cálculo do intervalo de peso ideal
        const pesomin = (18.5 * ((alturaMetros) * (alturaMetros))).toFixed(2);
        setPmin(pesomin);
        const pesomax = (24.9 * ((alturaMetros) * (alturaMetros))).toFixed(2);
        setPmax(pesomax);
    };
    
    return (
        <View style={styles.formContainer}>
            {/* Campo de entrada para o peso */}
            <TextInput
                style={styles.input}
                placeholder="Peso (kg)"
                keyboardType="numeric"
                value={peso}
                onChangeText={setPeso}
            />
            {/* Campo de entrada para a altura */}
            <TextInput
                style={styles.input}
                placeholder="Altura (cm)"
                keyboardType="numeric"
                value={altura}
                onChangeText={setAltura}
            />
        
            <Button title="Calcular IMC" color = "#20489f" onPress={calcularIMC} />
            {/* Exibição dos resultados */}
            <View style={styles.formResult}>
                {imc && <Result imc={imc} />}
                {classificacao && <ClassIMC classific={classificacao} />}
                {pmax && pmin && <PesoIdeal pesomin={pmin} pesomax={pmax} />}
            </View>
        </View>
    );
};

// Estilização dos componentes
const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: '#A9A9A9',
        padding: 16,
        borderRadius: 10,
    },
    input: {
        height: 40,
        backgroundColor: '#f0f0f0',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        borderRadius: 5,
    },
    formResult: {
        backgroundColor: '#f0f0f0',
        marginTop: 12,
        paddingBottom: 14,
        borderRadius: 10,
    },
});

export default FormIMC;
