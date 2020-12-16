$(document).ready(function(){
    // kada se ucita stranica prikazuju se samo naslov, podnaslov i inputi
    $('.greska').hide();
    $('.info').hide();
    
    $('button').click(function(){
        // ako u search inputu ne unesemo nista, prikazuje se upozorenje korisniku i ne dopusta se pokretanje funkcije
        if ($('.pretraga').val() == ""){
            alert("Niste unijeli pojam u pretragu")
        }
        else{
            search()  
        }
    })        
})

function search(){
        
        let term = $('.pretraga').val();
        let type = $('.category').val();
        //input godina nije obavezan, nije obavezno da bude popunjen
        let year = ""

        // ako je nesto uneseno u input godina uzimmamo tu vrijednost
        if ($('.godina').val() != ""){
            year = $('.godina').val();
            }
        
        $.ajax({
            type : "GET",
            url : `http://www.omdbapi.com/?apikey=b333cf31&t=${term}&type=${type}&y=${year}`,
            
            success: (response) =>{
                // ako film/serija nije pronadjen prikazuje se poruka
                if (response.Response === "False"){
                    $('.info').hide();
                    $('.greska').show();
                }
                else{
                    $('.greska').hide();
                    $('.slika').attr('src', response.Poster)
                    $('.naslov-get').html(response.Title)
                    $('.godina-get').html(response.Year)
                    $('.date-get').html(response.Released)
                    $('.trajanje-get').html(response.Runtime)
                    $('.reziser-get').html(response.Director)
                    $('.glumci-get').html(response.Actors)
                    $('.radnja-get').html(response.Plot)

                    // ako trazimo film ne prikazuje se broj sezona
                    if (type === "movie"){
                        $('.sezone').hide()
                    } else{
                        $('.sezone').show()
                        $('.sezona-get').html(response.totalSeasons)
                    }
                    
                    // dodaje onoliko list item-a u listu koliko postoji rejtinga
                    $('.izvor1-get').html(response.Ratings.forEach(function(item){
                        $('ul').append(`<li>${item.Source}: ${item.Value}</li>`)
                    }))
                    // prikazuju se podaci korisniku
                    $('.info').show();
                 }
            },
        });
    }