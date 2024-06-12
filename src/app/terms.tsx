import { Text, Heading, Center, ScrollView } from "@gluestack-ui/themed";
import ScreenContainer from "../components/ScreenContainer";

export default () => {
  return (
    <ScreenContainer>
        <ScrollView>
      <Center flex={1} flexDirection="column" justifyContent="center" alignItems="center" mt="$10" mb="$16">
        <Heading size="xl">Termos de Uso e Política de Privacidade</Heading>

        <Heading size="lg" mt="$4">Termos de Uso</Heading>

        <Heading size="md" mt="$2">1. Aceitação dos Termos</Heading>
        <Text size="md">
          Ao utilizar o aplicativo de auto gestão da saúde (doravante denominado
          &quot; Saúde em Suas Mãos: Plataforma de Autogerenciamento da Saúde
          &quot;), você concorda em cumprir e estar sujeito aos seguintes Termos
          de Uso. Se você não concorda com estes termos, não utilize o
          Aplicativo.
        </Text>
        <Heading size="md" mt="$2">2. Descrição do Serviço</Heading>
        <Text size="md">
          O Aplicativo oferece ferramentas para ajudar os usuários a gerenciar
          sua saúde, incluindo o monitoramento de condições de saúde,
          medicações, consultas médicas e outras atividades relacionadas à
          saúde.
        </Text>
        <Heading size="md" mt="$2">3. Uso do Aplicativo</Heading>
        <Text>
          Registro: Para utilizar o Aplicativo, é necessário criar uma conta
          fornecendo informações precisas e atualizadas. Você é responsável por
          manter a confidencialidade de sua conta e senha. 
          Responsabilidade do Usuário: O usuário é responsável por todas as atividades
          realizadas através de sua conta. Qualquer uso não autorizado, deverá
          realizar o reset da senha. 
          Restrições: Você concorda em não usar
          o Aplicativo para atividades ilegais ou não autorizadas, incluindo,
          mas não se limitando a, violar direitos de propriedade intelectual ou
          distribuir vírus ou outros códigos de computador prejudiciais.
        </Text>
        <Heading size="md" mt="$2">4. Modificações no Aplicativo</Heading>
        <Text size="md">
        O desenvolvedor reserva-se o direito de modificar ou descontinuar, temporariamente
        ou permanentemente, o Aplicativo ou qualquer parte dele, com ou sem aviso prévio.
        Você concorda que o desenvolvedor não será responsável por qualquer modificação,
        suspensão ou descontinuação do Aplicativo.
        </Text>

        <Heading size="md" mt="$2">5. Isenção de Responsabilidade</Heading>
        <Text size="md">O Aplicativo é fornecido &quot;como está&quot; e &quot;conforme disponível&quot;, sem garantias de
qualquer tipo, expressas ou implícitas. O desenvolvedor não garante que o Aplicativo
atenderá às suas necessidades ou que o serviço será ininterrupto, seguro ou livre de
erros. </Text>
        <Heading size="md" mt="$2">6. Limitações de Responsabilidade</Heading>
        <Text size="md">
        Em nenhuma circunstância o desenvolvedor será responsável por quaisquer danos
diretos, indiretos, incidentais, especiais, consequenciais ou exemplares, incluindo, mas
não se limitando a, danos por perda de lucros, uso, dados ou outras perdas intangíveis
resultantes do uso ou da incapacidade de usar o Aplicativo.
        </Text>

        <Heading size="lg" mt="$4">Política de Privacidade</Heading>
        <Heading size="md" mt="$2">1. Coleta de Informações</Heading>
        <Text size="md">Coletamos informações pessoais fornecidas por você, tais como nome, endereço de e-
mail, informações de saúde e outras informações relevantes para a gestão da sua
saúde.</Text>

        <Heading size="md" mt="$2">2. Uso das Informações</Heading>
        <Text size="md">
        As informações coletadas são utilizadas para:
- Fornecer e melhorar nossos serviços;
- Personalizar a experiência do usuário;
- Enviar notificações e comunicações relacionadas ao uso do Aplicativo;
- Cumprir obrigações legais e regulatórias.</Text>

        <Heading size="md" mt="$2">3. Compartilhamento de Informações</Heading>
        <Text size="md">
        Não compartilhamos suas informações pessoais com terceiros, exceto:
- Quando exigido por lei;
- Com seu consentimento explícito;
- Com prestadores de serviços que auxiliam na operação do Aplicativo, sob obrigação
de confidencialidade.</Text>

        <Heading size="md" mt="$2">4. Segurança das informações</Heading>
        <Text size="md">
        Implementamos medidas de segurança para proteger suas informações pessoais
contra acesso, alteração, divulgação ou destruição não autorizada. No entanto,
nenhum método de transmissão pela Internet ou método de armazenamento eletrônico
é 100% seguro. </Text>

<Heading size="md" mt="$2">5. Segurança das informações</Heading>
<Text size="md">Você tem o direito de acessar, corrigir ou excluir suas informações pessoais
armazenadas no Aplicativo.</Text>

<Heading size="md" mt="$2">6. Alterações nesta Política de Privacidade</Heading>
<Text size="md">Reservamo-nos o direito de atualizar nossa Política de Privacidade periodicamente.
Quaisquer alterações serão notificadas através do Aplicativo ou por outros meios
adequados.</Text>
      </Center>
        </ScrollView>
    </ScreenContainer>
  );
};
