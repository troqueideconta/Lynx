const { MessageEmbed } = require("discord.js");
const Command = require("../../classes/Command");
const { MessageMenu, MessageMenuOption, MessageActionRow } = require('discord-buttons');
const generateErrorEmbed = require("../../classes/ErrorMessage");
const generateSucessEmbed = require("../../classes/SucessMessage");

const command = new Command('produtos', 'Informações')
    .setExecute(async execParams => {
        const { message, client } = execParams;

        message.channel.send(`${message.author}, enviei todos nossos produtos em seu privado, da uma olhadinha lá. ;3`)

        await message.author.createDM();

        const msg = new MessageEmbed()

       .setTitle('📦 | Courtesy´s Store')
       .setDescription(`
       
       
       \`\`\`Olá, você está no menu de produtos do bot da Courtesys Store\`\`\`
       
    Para ver nossos produtos escolha a categoria de acordo com o produto 
    desejado para ver as informações, caso queira algum produto basta ir no canal <#879851078714273923>
    e abrir um ticket de compra para adquirir o mesmo!

    <:Tempo:879853848611659808> | **__Antes de qualquer compra não esqueça de ler nossos  <#879851072091475968>!__**

    **Meios de pagamento: <:PIX:879854150878371850> <:mercadopago:879854168234426428> <:paypal:879854135032299561>**  (Paypal será cobrado uma taxa)
       
       `)
       .setColor('#7FFFD4')

    let op01 = new MessageMenuOption()
       .setLabel('Menu')
       .setEmoji('🏘️')
       .setValue('menu')
       .setDescription('Reaja aqui para voltar ao menu.')

   let op = new MessageMenuOption()
       .setLabel('Plano simples')
       .setEmoji('🤖')
       .setValue('p')
       .setDescription('Reaja aqui para ver o plano simples de bot.')

   let op1 = new MessageMenuOption()
       .setLabel('Plano mediano')
       .setEmoji('🤖')
       .setValue('p1')
       .setDescription('Reaja aqui para ver o plano mediano de bot.')

    let op2 = new MessageMenuOption()
       .setLabel('Plano avançado')
       .setEmoji('🤖')
       .setValue('p2')
       .setDescription('Reaja aqui para ver o plano avançado de bot.')   
       
    let op3 = new MessageMenuOption()
       .setLabel('Contas minecraft original')
       .setEmoji('🧱')
       .setValue('p3')
       .setDescription('Reaja aqui para ver o preço das contas de minecraft original.')
       
    let op4 = new MessageMenuOption()
       .setLabel('Capa da optifine')
       .setEmoji('🧰')
       .setValue('p4')
       .setDescription('Reaja aqui para ver o preço das capas da optifine ')   

   let botao = new MessageMenu()
       .setID('customid')
       .setPlaceholder('Clique aqui para ver as categorias dos produtos')
       .setMaxValues(1)
       .setMinValues(1)
       .addOption(op01)
       .addOption(op)
       .addOption(op1)
       .addOption(op2)
       .addOption(op3)
       .addOption(op4)


       client.on('clickMenu', async menu => {
        let menuValue = menu.values[0]
      
          if (menuValue === 'p') {
          let embed = new MessageEmbed()
           .setAuthor(`🤖 | Plano simples`)
           .setDescription(`
    BOT SIMPLES = 15 REAIS

    /ajuda;\n/ping;
    /aviso;\n /beijar;
    /tapa;\n  /ban;
    /banlist;\n/serverinfo;
    /userinfo;\n/abraçar;
    /avatar;\n/sugestão;
    /limpar;
    
    Sistema de entrada e saída 
    
    **2 Reais por mês devido a host**
    **Caso queira algum comando que não esteja no plano basta me chamar em um ticket**
    `)
            .setColor('#7FFFD4')
      
          menu.message.update(embed);
        }
      })



      client.on('clickMenu', async menu => {
        let menuValue = menu.values[0]
      
          if (menuValue === 'p1') {
          let embed = new MessageEmbed()
            .setAuthor(`🤖 | Plano mediano`)
            .setDescription(`
    BOT MEDIANO = 30 REAIS
    
    /ajuda;\n /ping;
    /aviso;\n /kiss;
    /tapa;\n  /ban;
    /banlist;\n/serverinfo;
    /sugestão;\n/userinfo;
    /abraçar;\n/avatar;
    /limpar;
    
    Sistema de entrada e saída 
    Sistema de ticket; 
    Bloqueador de links; 
    
    **4 Reais por mês devido a host**
    **Caso queira algum comando que não esteja no plano basta me chamar em um ticket**
    `)
           .setColor('#7FFFD4')
      
          menu.message.update(embed);
        }
      })

      client.on('clickMenu', async menu => {
        let menuValue = menu.values[0]
      
          if (menuValue === 'p2') {
          let embed = new MessageEmbed()
            .setAuthor(`🤖 | Plano avançado`)
            .setDescription(`
    BOT AVANÇADO = 45 REAIS
    
    /ajuda;\n/ping;
    /aviso;\n/kiss;
    /tapa;\n/sugestão;
    /ban;\n/banlist;
    /serverinfo;\n/userinfo;
    /abraçar;\n/avatar;
    /limpar;\n/status;
    /lock;\n/unlock;     
    /solicitar-yt;\n/denunciar;
    /enquete;\n/ship;
    
    Sistema de economia 
    Sistema de entrada e saída 
    Sistema de ticket; 
    Bloqueador de links; 
    
    **4 Reais por mês devido a host**
    **Caso queira algum comando que não esteja no plano basta me chamar em um ticket** 
    `)
           .setColor('#7FFFD4')
      
          menu.message.update(embed);
        }
      })


      client.on('clickMenu', async menu => {
        let menuValue = menu.values[0]
      
          if (menuValue === 'p3') {
          let embed = new MessageEmbed()
          .setDescription(`

          <a:mine:879872532516319323> | **__Contas minecraft SFA__**
       
            1x <a:seta:879874080164180029> R$1,00
            5x <a:seta:879874080164180029> R$4,00 
            10x <a:seta:879874080164180029> R$7,00 
            20x <a:seta:879874080164180029> R$11,00 
            30x <a:seta:879874080164180029> R$16,00 
            40x <a:seta:879874080164180029> R$20,00
            50x <a:seta:879874080164180029> R$26,00


            <a:mine:879872532516319323> | **__Contas minecraft FULL ACESSO__**

            1x <a:seta:879874080164180029> R$55,00
       
            **Caso queira mais contas abra um ticket para negociar um preço legal**`)
           .setColor('#7FFFD4')
      
          menu.message.update(embed);
        }
      })

      client.on('clickMenu', async menu => {
        let menuValue = menu.values[0]
      
          if (menuValue === 'p4') {
          let embed = new MessageEmbed()
          .setDescription(`

          <:capa:880988679433236520> | **__Capa da optifine__**
       
            1x <a:seta:879874080164180029> R$35,00
       
            **Todas as contas tem acesso ao email do doador, sendo assim ela permanente pra você!**`)
           .setColor('#7FFFD4')
      
          menu.message.update(embed);
        }
      })

      client.on('clickMenu', async menu => {
        let menuValue = menu.values[0]
      
          if (menuValue === 'menu') {
          let embed = new MessageEmbed()
          .setTitle('📦 | Courtesy´s Store')
          .setDescription(`
          
          
          \`\`\`Olá, você está no menu de produtos do bot da Courtesys Store\`\`\`
          
       Para ver nossos produtos escolha a categoria de acordo com o produto 
       desejado para ver as informações, caso queira algum produto basta ir no canal <#879851078714273923>
       e abrir um ticket de compra para adquirir o mesmo!
   
       <:Tempo:879853848611659808> | **__Antes de qualquer compra não esqueça de ler nossos  <#879851072091475968>!__**
   
       **Meios de pagamento: <:PIX:879854150878371850> <:mercadopago:879854168234426428> <:paypal:879854135032299561>**  (Paypal será cobrado uma taxa)
          
          `)
          .setColor('#7FFFD4')
      
          menu.message.update(embed);
        }
      })

       message.author.send(msg, {
        components: [new MessageActionRow().addComponent(botao)]
      })
    
    })
module.exports = command;