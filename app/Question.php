<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    public $timestamps = false;

    public function message()
    {
        return $this->hasOne('App\Message', 'id');
    }

    public function answers()
    {
        return $this->hasMany('App\Answer')->get();
    }

    public function commentable()
    {
        return $this->hasOne('App\Commentable');
    }

    public function correct_answer()
    {
        return $this->belongsTo('App\Answer', 'correct_answer');
    }

    public function get_num_answers()
    {
        return $this->answers()->count();
    }

    public function scopeHighlyVoted($query)
    {
        return $query->join('messages', "messages.id", "questions.id")
            ->orderBy('messages.score', 'DESC')->get();
    }

    public function scopeSearch($query, $search)
    {
        if (!$search) {
            return $query;
        }

        return $query
            ->whereRaw('search @@ plainto_tsquery(\'english\', ?)', [$search])
            ->orderByRaw('ts_rank(search, plainto_tsquery(\'english\', ?)) DESC', [$search]);
    }

}