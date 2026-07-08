import { type ReactNode } from "react";
import "./_quick-action-layout.scss";
import { Group,  Panel, Separator  } from "react-resizable-panels";
import { QuickActionHeader } from "../quick-action-header/QuickActionHeader";

type Props = {
  children: ReactNode;
  isOpen?: boolean;
};

export const QuickActionLayout = ({
  children,
  isOpen = false,
}: Props) => {
  const onClose = () => {};
  return (
    <aside
      className={`
        quick-action-layout
        ${isOpen ? "quick-action-layout--open" : ""}
      `}
      aria-hidden={!isOpen}
    >

      <div className="quick-action-layout__backdrop" />


      <Group
      
        orientation="horizontal"
        className="quick-action-layout__group"
      >

        <Panel
          groupResizeBehavior="preserve-pixel-size"
         
        />

        <Separator className="quick-action-layout__separator" />


        <Panel
            maxSize={1000}
            defaultSize={300}
            minSize={300}
          groupResizeBehavior="preserve-pixel-size"
        >

          <div className="quick-action-layout__panel">
             <QuickActionHeader
                title="Create task"
                description="Add a new task to this project and capture the key details before assigning it."
                onClose={onClose}
            />
            <div className="quick-action-layout__children">
              {children}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas laborum aperiam, mollitia perspiciatis recusandae optio fugit. Nemo, ratione debitis aut voluptatem, unde voluptates cumque, fugit blanditiis labore mollitia perspiciatis illum!
              Nostrum commodi, quasi repellat veniam dicta pariatur incidunt temporibus exercitationem eum, modi ducimus vel quisquam vitae autem reiciendis sapiente tempora recusandae consequuntur optio quia ex inventore! Culpa suscipit minus exercitationem!
              Natus quod aliquam temporibus quos tempora nihil minus error doloribus distinctio, consequuntur assumenda est, quibusdam quis dolore officiis repellat iusto cumque! Hic saepe impedit optio veritatis porro corrupti obcaecati repellat!
              Itaque corporis veniam officia explicabo provident quo at assumenda vero laborum, odit ipsa quos accusamus commodi voluptatem illum est unde repellendus quibusdam vel veritatis. Quia eligendi fuga quaerat tenetur esse?
              Laudantium iste provident odio doloremque totam officiis aperiam ipsum impedit nobis dolorem eveniet fugit beatae possimus repellendus, ducimus deleniti earum ut error. Sint sequi totam beatae saepe dicta impedit quaerat?
              Voluptatibus sint nobis modi aperiam quo fugit ut id explicabo nisi saepe, vitae, quod ab dolorem reprehenderit ex eum similique, doloribus porro? Recusandae sapiente inventore est repudiandae aliquam labore totam!
              Consequatur soluta voluptatum sed omnis, inventore molestias repellat earum vero adipisci ipsa harum placeat accusantium ducimus repudiandae quasi modi cum iure eos? Magnam voluptatem qui nobis quisquam! Necessitatibus, modi laboriosam.
              Placeat tempore aperiam numquam amet recusandae consequatur ad reiciendis, sunt tempora molestiae explicabo repellat eum pariatur dignissimos? Provident blanditiis aliquam id, maxime sequi officia, eligendi vitae perferendis ea, modi non?
              Commodi at ex ipsum eos perspiciatis dolore voluptate eius nostrum incidunt laborum, et numquam repellat exercitationem reiciendis, dignissimos placeat? Accusamus sunt aut eveniet temporibus libero quam aliquid a alias cupiditate?
              Laboriosam libero modi quos pariatur minima necessitatibus veritatis odio porro voluptate perferendis quidem expedita facilis excepturi suscipit consectetur, distinctio ut dicta temporibus repellat mollitia dolor nesciunt facere reiciendis quasi. Perspiciatis.
              Cumque dolor officia ipsum eveniet inventore eius quae ducimus quaerat corporis saepe? Eos perferendis quidem dolorem laborum debitis, tenetur omnis assumenda, error ea quas qui eaque repudiandae facere doloremque consequuntur.
              Vero inventore ullam architecto vitae sapiente nihil culpa atque accusamus aperiam. Est tenetur culpa eveniet maxime modi error sapiente dicta eum, nesciunt repellat ipsa iusto esse? In rem pariatur eos!
              Dicta excepturi provident odit eveniet ad, quasi debitis pariatur unde recusandae voluptate, dolore ab exercitationem sit culpa ullam in facilis sint perferendis non magnam. Natus accusamus quidem fugit fuga exercitationem.
              Molestias doloribus odio, eum eos tenetur neque, sapiente doloremque officiis quisquam, ut accusamus a laudantium omnis sit molestiae nostrum fuga fugit voluptatum incidunt in magnam veniam. Fugiat mollitia facere iste!
              Dolorem minima, nemo adipisci error eaque sapiente vel veritatis ipsa vero dolores explicabo repudiandae, quis quo dolore tempora maiores corrupti dolor, pariatur at nobis nesciunt cumque! Vero animi voluptates aliquid!
              Debitis alias recusandae quos voluptate commodi porro veniam dignissimos possimus laudantium velit, vel voluptatum quod necessitatibus culpa dolorum unde ab nulla sed in! Quisquam, excepturi temporibus quae in nisi fugiat?
              Labore autem ipsa aspernatur, repellendus laboriosam quaerat neque similique nam dolores error deleniti animi vel quo beatae est consequuntur rerum cum ad quasi libero iste perspiciatis minima ullam? Vel, minima.
              Aut architecto magni libero totam. Illo sequi perspiciatis voluptatibus, dolores, eveniet impedit ab delectus laudantium est qui labore unde iure cum aspernatur necessitatibus ullam beatae! Autem veniam quisquam soluta ratione.
              Autem deleniti nihil architecto corrupti ipsa doloremque veniam optio, iure accusantium aspernatur reprehenderit possimus dolorem iste at animi beatae veritatis soluta voluptate omnis quos. Sunt sed doloremque saepe accusantium odit?
              Fugit dolor ea enim illum! Quaerat odit praesentium sit, et ipsa neque blanditiis dolorem sunt, rem mollitia architecto similique, obcaecati accusantium minus. Minus voluptates vel id aspernatur dignissimos voluptatibus amet!
              Blanditiis veritatis minus sunt impedit. Molestias saepe nisi culpa iure. Numquam eum tempore omnis repudiandae sunt sint consequatur quasi assumenda, repellendus, beatae quis nesciunt, quas incidunt vero ratione laudantium amet?
              Molestiae quas vero ipsa, rerum tenetur est perferendis recusandae velit praesentium quis quasi aliquam nisi, debitis sapiente cumque maxime facilis? Repellendus quis cum sunt officia beatae suscipit enim consequatur inventore?
              Porro laboriosam iste voluptates adipisci maiores ducimus atque sequi, dolor, temporibus, blanditiis molestiae. Necessitatibus tenetur voluptates quae quod repellendus hic, dolorem, assumenda porro vel velit totam obcaecati dolore maiores sunt?
              Itaque sequi facere ducimus molestias quos dicta rem commodi laboriosam perferendis, quod distinctio quam suscipit at libero incidunt, non eius inventore maiores? Unde qui reiciendis molestiae vero sunt repellat eius!
              Fuga, nobis consequuntur facilis laboriosam expedita voluptatem error voluptatum temporibus amet deleniti assumenda ratione dolor maxime adipisci provident magni aut id omnis nostrum animi optio minima! Soluta perspiciatis veritatis nemo.
              Et aperiam repellat alias ad, exercitationem recusandae nobis, id voluptate atque ut quia labore temporibus reprehenderit deserunt tempore. Repellat delectus modi assumenda recusandae mollitia saepe dolore labore ab quidem facere.
              Perspiciatis libero nostrum eaque, dolorum harum explicabo pariatur, eos ipsam illo ad quidem suscipit sint facere autem. Molestiae repellendus voluptatem, itaque possimus exercitationem, quibusdam numquam optio quam autem aperiam eos.
              Aliquid, quod fuga voluptate ipsa debitis corporis voluptatum beatae magnam vitae quibusdam laborum sint doloremque exercitationem, blanditiis modi culpa deleniti enim tenetur cumque. Commodi necessitatibus ullam impedit officiis. Iusto, sunt?
              Quisquam labore autem recusandae facere, accusantium ea hic doloribus corrupti, voluptatibus atque animi eos incidunt error! Non nihil quasi omnis repudiandae nesciunt quidem nulla quibusdam odit tempore sed, a dolor.
              Iusto sint rerum distinctio velit, voluptas vitae neque vero dolor nam ipsam explicabo delectus, laborum beatae! Provident voluptatem similique cum. Incidunt voluptatem cumque sunt quas eaque perspiciatis sed, animi quo.
              At alias animi repellendus eligendi minima sunt est, quam nam itaque nostrum, aliquid corporis fugiat cupiditate ratione quibusdam eaque ex facere voluptatibus, incidunt cum repellat. Assumenda repellendus excepturi et ut.
              Nihil voluptates laborum illo et iste veritatis architecto fugit nulla voluptate molestias eligendi, optio iure reiciendis quis quaerat aperiam aliquid voluptatum, quas, necessitatibus culpa dignissimos maxime. Magnam corporis quibusdam temporibus!
              Quod impedit adipisci deleniti error ut rem harum voluptatem explicabo possimus aliquam? Reiciendis, sed commodi eos, dicta recusandae cum repudiandae facere, corrupti porro placeat tempora expedita. Hic sed laborum maiores!
              Sint, molestias perferendis ea illo commodi ut voluptatibus animi ex cumque laborum veniam a delectus reprehenderit modi natus maiores in sed veritatis praesentium saepe itaque? Minima corrupti quasi odit placeat?
              Repudiandae, dicta! Sequi neque et, reprehenderit explicabo distinctio voluptatem dolore animi saepe laboriosam fugit necessitatibus ducimus, non doloremque, facilis magni nam recusandae eaque ratione porro nemo ea rem nisi harum.
              Consequuntur consequatur totam inventore dolor animi dolorem repudiandae asperiores in, officia pariatur earum autem nulla voluptatum! Tenetur saepe dolor sunt minima. Placeat pariatur libero, numquam corrupti consequuntur consequatur. Provident, aliquam!
              Nam, expedita dolorem tenetur velit cumque ducimus ipsam tempore magni quae, ullam, ipsa sequi aliquam in est error odit maiores provident fuga. Ex ullam ratione distinctio facilis explicabo nisi officiis!
              Totam, vero! Voluptatibus quidem ipsam illum beatae aliquam temporibus recusandae corporis, error iure quaerat! Debitis voluptate cupiditate temporibus, magnam enim quae error minus magni nobis adipisci ipsa facere ipsam. Deleniti?
              Vero suscipit sunt eum ducimus eligendi asperiores ipsa tempora blanditiis pariatur voluptatem, minus, quas incidunt voluptatum doloremque deleniti odit esse deserunt quae! Nostrum voluptatibus quidem dolores ratione molestias exercitationem at.
              Ad praesentium non sapiente incidunt ratione eveniet enim accusantium officia voluptas quis saepe hic, ab est ipsum explicabo recusandae temporibus ut soluta. Magni ea impedit ipsam. Nam cupiditate quaerat nesciunt!
              Sit id inventore porro quae, perferendis quam? Voluptates suscipit repudiandae eum, iste at, itaque odit, consequuntur eligendi nemo exercitationem commodi corrupti. Corporis, nostrum reprehenderit! Ea voluptate iure rem ducimus quae.
              Minus voluptates totam iure ullam dolor ut, officiis earum corporis nobis. Veniam impedit necessitatibus fuga facilis expedita saepe recusandae, accusamus voluptatibus reprehenderit quia neque ab inventore, illo nostrum dolor omnis.
              Rem ut corporis exercitationem! Repellendus sed illo dignissimos magnam ut fugiat et, consectetur eveniet vero, excepturi voluptates dolores. Officiis sunt minus sit voluptatem, repellat optio nihil error fugit soluta exercitationem.
              Consequatur ut, iste ipsum eligendi dolorem quod tempora perspiciatis laborum autem officiis perferendis porro molestias, fuga expedita debitis maiores adipisci cupiditate, nam eveniet mollitia! Quis laboriosam adipisci ipsum inventore consequatur!
              Dolorem voluptas fuga dignissimos magnam, consectetur quos placeat minus voluptatem deserunt quo vitae quibusdam corrupti eligendi earum obcaecati aspernatur ab? Doloribus sequi a asperiores fugiat molestias, dolore deserunt enim cumque?
              Inventore ullam ex explicabo enim delectus sunt ut neque, doloremque ducimus error ad est libero provident cupiditate laudantium fugit vero amet laborum. Voluptates magnam maxime, explicabo quod molestias velit tenetur.
              At ratione modi asperiores quae minima debitis esse doloremque, doloribus in distinctio pariatur quo harum fuga tenetur quod natus tempora sint sunt repellat eligendi vitae temporibus, architecto autem! Quisquam, illum.
              Quaerat, nulla ratione odio quod molestias tempora voluptatibus quam quidem praesentium aut nobis vero. Eaque, quia delectus. Soluta nostrum dolores quia vel magni. Dolor animi praesentium minus nesciunt iusto ducimus.
              Doloremque omnis quaerat animi magnam, earum fuga fugit quas numquam quis, eum ipsam amet quae, esse veniam blanditiis. Voluptas in saepe maxime nulla ipsa quasi dolores placeat cum nihil excepturi!
              Alias assumenda voluptas error nisi voluptate et numquam possimus nulla porro enim sunt at vel ipsa labore explicabo quis molestias rerum illum, architecto voluptates earum iusto eius! Ullam, pariatur laudantium.
              Quaerat reiciendis illo iusto officiis expedita aut atque architecto eum ut repudiandae. Blanditiis quas mollitia pariatur repellendus, nemo distinctio culpa! Eum pariatur, mollitia molestias iste laborum aspernatur sed sunt officiis!
              Illum blanditiis itaque consequuntur omnis vel voluptas ipsa quasi, atque veritatis placeat asperiores odio cumque delectus dolor quidem dolorum pariatur magni accusantium voluptates nemo dignissimos quis reiciendis earum. Reiciendis, expedita?
              Corporis sapiente doloribus est. At reprehenderit blanditiis soluta beatae voluptate, quasi laudantium ipsa ad commodi animi harum ea culpa! Alias a optio laboriosam provident nam tempore sit sint laudantium amet?
              Modi possimus quis enim similique! Expedita numquam sequi ratione, voluptatum ducimus earum voluptatibus consectetur nisi animi tempora recusandae ut iure dolore saepe magnam esse reiciendis obcaecati vero repudiandae est ab.
              Iste quasi velit, id ipsam non officia aperiam dolorem eum culpa voluptatibus asperiores. Voluptas ex nulla voluptatum, distinctio repellat vero nam pariatur eligendi incidunt nesciunt hic illum, alias dolore perferendis!
              Asperiores nihil facilis corporis voluptatum voluptas esse eveniet. Obcaecati ipsam dolorum eos, a nesciunt voluptatibus, provident unde alias repudiandae officia eius totam, consectetur eaque magni! Quibusdam fugit et vero dignissimos?
              Beatae tempore obcaecati velit inventore et ab, nisi sit perferendis assumenda tempora hic eveniet possimus magnam est, quae qui aut ut. Iure a quas odio eveniet rem modi, facilis molestias!
              Nemo, ad odio. Ea, eos rem, dicta dolore quisquam doloremque facere tenetur magnam itaque, a obcaecati nostrum nisi dolorem omnis. Dolore accusamus officiis suscipit odio aliquam beatae quibusdam placeat ut.
              Quisquam suscipit maiores facilis distinctio sunt quo corrupti consectetur maxime minima deserunt illum, cupiditate, nemo esse blanditiis reprehenderit quibusdam aliquid porro omnis quasi aut tenetur harum dolorem! Sequi, similique repudiandae!
              Distinctio minus rerum natus et? Optio asperiores harum nihil provident magni laboriosam eaque itaque nostrum enim, doloremque tempora sed nulla consequatur, ea deserunt quia temporibus eos minima. Labore, aut porro?
              Enim porro sunt cumque eum non a delectus exercitationem nobis, deleniti inventore odio natus facilis fuga ipsa cum minima aperiam qui corrupti impedit sint accusamus. Laudantium deleniti asperiores architecto iure.
              Mollitia quia odio illo dolore consequuntur accusamus cumque iste, aspernatur necessitatibus recusandae, officiis voluptatum deserunt eveniet unde consectetur! Aut facere molestiae quis dolore nemo consequuntur quidem soluta iste, nihil tempora!
              Dolores temporibus culpa tempora maxime quam ullam voluptatem quidem non accusamus libero soluta consequatur deserunt tenetur quas provident rem aut consequuntur natus, sequi veritatis assumenda cupiditate odio fugiat magni! Sed!
              Mollitia minima possimus iure recusandae sed corporis officiis, repellat suscipit, natus laborum eaque harum a, minus quasi fugiat sapiente fugit cumque similique! Quis a consequuntur maxime voluptate. Pariatur, repudiandae nobis.
              Atque nostrum minus, dolorum quos officiis officia similique laboriosam voluptatum eaque quod dignissimos magni recusandae beatae fuga aut molestiae ut ducimus pariatur ipsam, eveniet ab corrupti vitae rem ipsa! Sint.
              Aperiam magnam expedita veniam fugiat soluta dolores, corporis nihil aliquam laboriosam, eos vero quibusdam deserunt quia repudiandae blanditiis obcaecati mollitia quis? Exercitationem autem quaerat similique at quae? Officia, necessitatibus nesciunt?
              Voluptates sint consequuntur ea animi deserunt, ab inventore quod commodi accusantium eaque, earum eos similique qui quasi rerum harum modi blanditiis minima obcaecati dolorem provident cum natus nulla ducimus! Totam?
              Ullam magnam doloremque dolores ipsa illum, est fuga. Aliquid quis totam earum? Optio, animi? Inventore quisquam autem doloribus illum! Laudantium officia temporibus eligendi ipsum quo. Tempora eligendi voluptas minus repudiandae!
              Recusandae nam explicabo ullam similique officia. Reiciendis blanditiis hic repellat unde porro, repellendus aliquid minus omnis. Nesciunt, modi ad. Aut blanditiis beatae ipsum a natus! Praesentium corporis accusamus quaerat eius!
              Quae aliquid, cum quod ullam, aperiam delectus vitae repudiandae dignissimos, corporis sint eius autem omnis ad optio praesentium veniam maiores libero illo! Odit, exercitationem. Aliquid quod quis iure cumque fugit!
              Quaerat itaque molestiae modi natus adipisci repellat laboriosam veniam facilis nemo? Dignissimos ullam porro nam rem doloremque sequi, ad beatae sit, in modi omnis! Commodi deserunt perspiciatis optio recusandae dolores.
              Aliquam eum consequatur soluta inventore quibusdam, odio nemo exercitationem porro quos illo enim molestiae quam doloremque alias! Officia provident sint unde animi voluptatibus quos, voluptates amet cumque, facilis debitis autem.
              Maiores voluptate ducimus at fugit? Ad explicabo eligendi nostrum incidunt doloribus officiis saepe laborum, perspiciatis, ab a eveniet exercitationem reprehenderit veniam numquam alias dolores molestias? Atque assumenda nesciunt voluptate facilis.
              Natus reprehenderit earum, obcaecati sit, ipsa enim quo ex fugit harum nulla, ad corporis aspernatur? Officiis enim id, quaerat ipsa aliquid delectus aliquam accusantium nostrum repudiandae expedita eligendi nulla amet.
              A, asperiores nam iure aperiam at omnis error! Assumenda harum deserunt ut quod, cupiditate adipisci debitis dolorum molestiae culpa accusamus, qui sequi itaque. Natus fugit aliquid sequi quo id ducimus?
              Minima ratione id aperiam. Magni vitae in nisi repellendus expedita iusto at tempora, facere corrupti reprehenderit deleniti fugiat reiciendis omnis pariatur necessitatibus doloremque sunt neque. Magni ad nemo quia molestiae?
              Cupiditate tempora et fugiat eos quibusdam corrupti, dolor pariatur adipisci consectetur quis exercitationem porro ipsam dolore totam ipsa iure, dolores sint. Temporibus explicabo facere delectus? Animi neque ipsum corporis odit.
              Optio similique et rerum maiores labore magni illum ex qui consectetur voluptatum. Omnis ut reprehenderit voluptate ex blanditiis similique facere nulla, deleniti excepturi saepe, et repellat cupiditate quidem ratione tenetur!
              Ducimus ad corporis, at ab atque dolor quam veniam quas dolores porro facilis illo quis iusto itaque, accusamus nam quibusdam voluptatibus consequuntur velit voluptatem? Velit ab tenetur in assumenda deserunt.
              Inventore voluptatibus autem dolorum debitis laborum aliquam, voluptas sapiente! Magni reprehenderit laborum officia dicta, laudantium ad consectetur! Necessitatibus quis corrupti, aperiam accusantium facilis aspernatur ipsam odit aut, illum incidunt beatae.
              Officiis labore veritatis aut nesciunt expedita quo dicta voluptatem sit possimus odio! Libero quod eaque veritatis adipisci mollitia, corporis inventore officiis, incidunt distinctio aliquam itaque. Ducimus doloremque totam modi adipisci.
              Fuga, perferendis! Repudiandae, accusamus numquam eum eveniet nisi natus molestiae fuga libero sed impedit inventore voluptas et! Labore illum, exercitationem repellat dolor possimus recusandae, veniam voluptates quibusdam aspernatur culpa autem!
              Inventore hic laboriosam adipisci placeat corporis optio delectus maxime, possimus aut facilis ullam porro cumque beatae obcaecati laudantium deleniti numquam nam voluptates nisi quibusdam labore recusandae quae velit rem? Natus?
              Eaque, dolores at obcaecati tempora sequi quasi est molestias cum expedita doloremque modi minima pariatur fuga rerum dolorum quas atque perspiciatis, assumenda voluptates voluptas! Consectetur accusamus laborum facilis at voluptatibus.
              Architecto rerum eveniet cum ullam tenetur doloribus eligendi fugit enim? Similique, eius praesentium totam, aut quae odit ullam quaerat aliquam optio minima soluta maxime voluptatem deleniti laborum! Molestias, molestiae impedit!
              Reiciendis soluta ipsam est mollitia culpa, accusamus voluptate fuga quasi explicabo. Fugit, incidunt. Corrupti dicta natus cupiditate maiores molestias, rem quia, rerum molestiae aperiam voluptas nostrum repudiandae impedit. Molestiae, rem!
              Quas, culpa possimus tempora itaque illum placeat nesciunt laudantium aut veniam quae labore voluptate inventore animi qui ea adipisci totam, ut architecto? Debitis voluptatem sit, praesentium quibusdam eius ducimus sed.
              Enim provident nulla, alias fugiat perferendis amet nesciunt hic fugit quidem obcaecati, magnam unde, deserunt quo? Repudiandae aspernatur nostrum corporis, unde voluptate, saepe expedita perspiciatis vero error laudantium doloribus aperiam.
              Vel, omnis numquam quo pariatur ipsam alias officiis, labore quisquam voluptatibus inventore placeat fuga, excepturi perferendis. Perspiciatis recusandae accusantium ipsa ducimus accusamus, numquam ad! Accusantium temporibus delectus omnis est voluptatem?
              Tenetur voluptate reprehenderit magnam vero illo ex dicta harum aperiam repellendus accusamus, animi eum cupiditate officia quam quia aut explicabo maxime. Ullam fugit sit veniam voluptates, porro voluptatibus. Eveniet, error!
              Placeat aliquid ducimus expedita sapiente? Provident commodi recusandae ipsa nam aut atque maxime velit et maiores praesentium nostrum eos, non inventore at nihil officia deleniti amet fuga, eaque quis adipisci.
              Nemo, dolore molestias perferendis voluptatibus, assumenda aliquid impedit autem quam neque officia quaerat illo voluptatum et, quae necessitatibus! Cumque itaque, suscipit autem odit quia officiis esse voluptatibus ullam! Suscipit, pariatur!
              Ducimus consectetur repellendus pariatur assumenda accusantium deleniti corrupti eaque ut nesciunt mollitia rerum, nemo et officiis veniam animi odio provident ipsa, ratione suscipit a ad eos omnis nobis. Nesciunt, amet?
              Nam vitae nemo ad! Esse quibusdam sed laborum quod voluptatum laudantium, dolorum optio, possimus quo velit maxime laboriosam, molestiae voluptatem fuga eaque similique repudiandae. Nisi atque laboriosam pariatur natus accusamus.
              Vero placeat excepturi natus rem ducimus hic aspernatur soluta blanditiis optio, necessitatibus debitis rerum vel sit fugit perspiciatis libero qui asperiores saepe numquam officiis. Saepe id impedit placeat minima cumque.
              Veniam obcaecati sapiente ea voluptatum. Reprehenderit aut, nobis ea quaerat aperiam consectetur facilis nam voluptatum fugit perspiciatis libero nostrum quos error non modi distinctio asperiores hic excepturi vel, laudantium nisi.
              Quae debitis, sit ex tempora repellendus esse aut cumque tempore quaerat voluptatem, beatae ad! Corrupti, voluptate reprehenderit, asperiores deserunt, illum quae obcaecati aut est iusto libero quam eos? Nemo, esse.
              Necessitatibus minima soluta, fugit odio dolores alias rerum quas sequi eaque, ea nulla quasi vitae nihil deserunt earum enim. Eius fugit officiis ratione enim aspernatur. Repellendus unde quos dolores et?
              Optio ex quod quis. Iure nulla voluptatum modi, numquam possimus ex mollitia harum enim pariatur ratione necessitatibus. Qui quibusdam, ab voluptas libero cupiditate enim neque in debitis tenetur vel odio?
              Libero ducimus aliquam distinctio? Commodi aliquid vel praesentium, iusto explicabo totam harum enim sint blanditiis quia excepturi debitis! Quae fugit obcaecati excepturi deserunt hic quo alias inventore nisi est magni!
            </div>
          </div>

        </Panel>


      </Group>

    </aside>
  );
};